import { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { rawDB } from '../config/rawDb';
import { RowDataPacket } from 'mysql2/promise';

export const importSQLHandler = async (req: Request, res: Response): Promise<void> => {
  const filePath = req.file?.path;
  const originalFileName = req.file?.originalname || '';
  const baseName = path.basename(originalFileName, path.extname(originalFileName));

  if (!filePath) {
    res.status(400).json({ message: 'No SQL file uploaded' });
    return;
  }

  const connection = await rawDB.getConnection();
  let transactionStarted = false;

  try {
    // Use fs.promises for async file operations
    const rawSQL = await fs.readFile(path.resolve(filePath), 'utf8');
    await fs.unlink(filePath); // Asynchronous file deletion

    // Split SQL statements into an array
    const statements = rawSQL
      .split(/;\s*(?=INSERT INTO)/i)
      .map(s => s.trim())
      .filter(s => /^INSERT INTO\s/i.test(s));

    // Define priority order for table processing
    const priorityOrder = [
      'branches',
      'employee',
      'employeepr',
      'empprevemployer',
      'empeducbg',
      'familybgrnd',
      'empsiblings',
      'empspouse',
      'empchildren',
    ];

    // Sort statements with explicit typing
    statements.sort((a: string, b: string) => {
      const getIndex = (s: string) =>
        priorityOrder.findIndex(p => s.toLowerCase().includes(`into ${p}`));
      return getIndex(a) - getIndex(b);
    });

    await connection.query('START TRANSACTION');
    transactionStarted = true;

    // Process employee_summary separately
    if (/^employee_summary/i.test(baseName)) {
      for (const stmt of statements) {
        if (/insert into employee_summary/i.test(stmt)) {
          const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\(([\s\S]+?)\)\s*$/i);
          if (!match) continue;
    
          const rawColumns = match[1];
          const rawValues = match[2];
    
          const columns = rawColumns.split(',').map(c => c.trim().replace(/`/g, ''));
    
          // robust SQL value parser that preserves quoted JSON strings
          const values: string[] = [];
          let currentValue = '';
          let inQuotes = false;
    
          for (let i = 0; i < rawValues.length; i++) {
            const char = rawValues[i];
            const nextChar = rawValues[i + 1];
    
            if (char === "'" && rawValues[i - 1] !== '\\') {
              inQuotes = !inQuotes;
              currentValue += char;
            } else if (char === ',' && !inQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          if (currentValue) values.push(currentValue.trim());
    
        
          const cleanedValues = values.map(v => {
            const trimmed = v.trim();
          
            if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
              const inner = trimmed.slice(1, -1).replace(/''/g, "'");
          
              try {
                JSON.parse(inner); // valid JSON
          
                // ✅ escape for SQL and rewrap in single quotes
                const escaped = inner.replace(/'/g, "''");
                return `'${escaped}'`;
              } catch {
                const escaped = inner.replace(/'/g, "''");
                return `'${escaped}'`;
              }
            }
          
            return trimmed;
          });
          
          
  
          
    
          const payCode = cleanedValues[0];
          const empCodeId = cleanedValues[1];
    
          const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT 1 FROM employee_summary WHERE PayCode = ? AND EmpCode_id = ? LIMIT 1',
            [payCode, empCodeId]
          );
    
          if (rows.length === 0) {
            await connection.query(stmt);
            console.log(`Inserted EmployeeSummary: (${payCode}, ${empCodeId})`);
          } else {
            const updateCols = columns.slice(2);
            const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
            const query = `
              INSERT INTO employee_summary (${columns.join(', ')})
              VALUES (${columns.map(() => '?').join(', ')})
              ON DUPLICATE KEY UPDATE ${updateClause}
            `;
            await connection.query(query, cleanedValues);
            console.log(`Updated EmployeeSummary: (${payCode}, ${empCodeId})`);
          }
        }
      }
    
      await connection.query('COMMIT');
      console.log('Transaction committed for employee_summary.sql');
      res.status(200).json({ message: 'Employee summary import completed.' });
      return;
    }
    



  
    for (const stmt of statements) {


      if (/insert into branches/i.test(stmt)) {
        const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
        if (!match) continue;

        const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
        const values = match[2]
          .split(',')
          .map(v => v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'"));

        const branchCode = values[0];

        const [rows] = await connection.query<RowDataPacket[]>(
          'SELECT 1 FROM branches WHERE BranchCode = ? LIMIT 1',
          [branchCode]
        );

        if (rows.length === 0) {
          await connection.query(stmt);
          console.log(`Inserted BranchCode: ${branchCode}`);
        } else {
          const updateCols = columns.slice(1);
          const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
          const query = `
            INSERT INTO branches (${columns.join(', ')})
            VALUES (${columns.map(() => '?').join(', ')})
            ON DUPLICATE KEY UPDATE ${updateClause}
          `;
          await connection.query(query, values);
          console.log(`Updated BranchCode: ${branchCode}`);
        }
      } 




    //  if (/insert into employee/i.test(stmt)) {
    if (/insert into\s+employee\s*\(/i.test(stmt)) {

      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse employee INSERT statement: ${stmt}`);
        continue;
      }

      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));


      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();

      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) {
        values.push(currentValue.trim());
      }

 
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );

  
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for statement: ${stmt}`);
        continue;
      }

      const empCode = cleanedValues[0];
      const branchCodeIdIndex = columns.indexOf('BranchCode_id');

      if (branchCodeIdIndex === -1) {
        console.warn(`BranchCode_id column not found in columns: ${columns.join(', ')}`);
        continue;
      }
      const branchCodeId = cleanedValues[branchCodeIdIndex];

      const [branchRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM branches WHERE BranchCode = ? LIMIT 1',
        [branchCodeId]
      );

      if (branchRows.length === 0) {
        console.warn(`Skipping employee insert/update for EmpCode: ${empCode} due to missing BranchCode: ${branchCodeId}`);
        continue;
      }
  

      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM employee WHERE EmpCode = ? LIMIT 1',
        [empCode]
      );
   

      if (rows.length === 0) {
        console.log(`Attempting to insert new employee: ${empCode}`);
        try {
          await connection.query(stmt);
          console.log(`Inserted EmpCode: ${empCode}`);
        } catch (insertError) {
          console.error(`Failed to insert EmpCode: ${empCode}, Error: ${insertError instanceof Error ? insertError.message : 'Unknown error'}`);
          throw insertError;
        }
      } else {
        console.log(`Updating existing employee: ${empCode}`);
        const updateCols = columns.filter(col => col !== 'EmpCode');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO employee (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
        console.log(`Updated EmpCode: ${empCode}`);
      }
    }













    //employeepr Table
    if (/insert into\s+employeepr\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse employeepr INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for employeepr: ${stmt}`);
        continue;
      }
    
      const empCodeIdIndex = columns.indexOf('EmpCode_id');
      if (empCodeIdIndex === -1) {
        console.warn(`EmpCode_id column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const empCodeId = cleanedValues[empCodeIdIndex];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM employee WHERE EmpCode = ? LIMIT 1',
        [empCodeId]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping employeepr for Payrollid due to missing EmpCode: ${empCodeId}`);
        continue;
      }
    
      const payrollIdIndex = columns.indexOf('Payrollid');
      const payrollId = payrollIdIndex !== -1 ? cleanedValues[payrollIdIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM employeepr WHERE Payrollid = ? LIMIT 1',
        [payrollId]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new employeepr record for Payrollid: ${payrollId}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for Payrollid: ${payrollId}`, insertError);
          throw insertError;
        }
      } else {
        console.log(`Updating employeepr record for Payrollid: ${payrollId}`);
        const updateCols = columns.filter(col => col !== 'Payrollid');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO employeepr (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }
    








    //empprevemployeer Table
    if (/insert into\s+empprevemployer\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse empprevemployer INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for empprevemployer: ${stmt}`);
        continue;
      }
    
      const empCodeIdIndex = columns.indexOf('EmpCode_id');
      if (empCodeIdIndex === -1) {
        console.warn(`EmpCode_id column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const empCodeId = cleanedValues[empCodeIdIndex];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM employee WHERE EmpCode = ? LIMIT 1',
        [empCodeId]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping empprevemployer for EmpEducBgID due to missing EmpCode: ${empCodeId}`);
        continue;
      }
    
      const payrollIdIndex = columns.indexOf('Payrollid');
      const EmpEducBgID = payrollIdIndex !== -1 ? cleanedValues[payrollIdIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM empprevemployer WHERE EmpEducBgID = ? LIMIT 1',
        [EmpEducBgID]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new empprevemployer record for EmpEducBgID: ${EmpEducBgID}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for EmpEducBgID: ${EmpEducBgID}`, insertError);
          throw insertError;
        }
      } else {
        console.log(`Updating empprevemployer record for EmpEducBgID: ${EmpEducBgID}`);
        const updateCols = columns.filter(col => col !== 'EmpEducBgID');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO empprevemployer (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }









    //familybgrnd Table
    if (/insert into familybgrnd/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
      if (!match) continue;

      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
      const values = match[2]
        .split(',')
        .map(v => v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'"));

      const FamilyBgrndID = values[0];

      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM familybgrnd WHERE FamilyBgrndID = ? LIMIT 1',
        [FamilyBgrndID]
      );

      if (rows.length === 0) {
        await connection.query(stmt);
        console.log(`Inserted FamilyBgrndID: ${FamilyBgrndID}`);
      } else {
        const updateCols = columns.slice(1);
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO familybgrnd (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, values);
        console.log(`Updated FamilyBgrndID: ${FamilyBgrndID}`);
      }
    } 









    // empsiblings TABLE
    if (/insert into\s+empsiblings\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse empeducbg INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for empeducbg: ${stmt}`);
        continue;
      }
    
      const FamilyBgrnd_ID_Index = columns.indexOf('FamilyBgrndID_id');
      if (FamilyBgrnd_ID_Index === -1) {
        console.warn(`FamilyBgrnd_ID column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const FamilyBgrndID = cleanedValues[FamilyBgrnd_ID_Index];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM familybgrnd WHERE FamilyBgrndID = ? LIMIT 1',
        [FamilyBgrndID]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping empeducbg for EmpEducBgID due to missing FamilyBgrndID: ${FamilyBgrndID}`);
        continue;
      }
    
      const EmpSiblingIDIndex = columns.indexOf('FamilyBgrndID');
      const EmpSiblingID = EmpSiblingIDIndex !== -1 ? cleanedValues[EmpSiblingIDIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM empsiblings WHERE EmpSiblingID = ? LIMIT 1',
        [EmpSiblingID]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new empeducbg record for EmpSiblingID: ${EmpSiblingID}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for EmpEducBgID: ${EmpSiblingID}`, insertError);
          throw insertError;
        }
      } 

      else {
        console.log(`Updating empsiblings record for EmpSiblingID: ${EmpSiblingID}`);
        const updateCols = columns.filter(col => col !== 'EmpSiblingID');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO empsiblings (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }












    // empspouse
    if (/insert into\s+empspouse\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse empspouse INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for empeducbg: ${stmt}`);
        continue;
      }
    
      const FamilyBgrnd_ID_Index = columns.indexOf('FamilyBgrndID_id');
      if (FamilyBgrnd_ID_Index === -1) {
        console.warn(`FamilyBgrnd_ID column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const FamilyBgrndID = cleanedValues[FamilyBgrnd_ID_Index];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM familybgrnd WHERE FamilyBgrndID = ? LIMIT 1',
        [FamilyBgrndID]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping empspouse for EmpEducBgID due to missing FamilyBgrndID: ${FamilyBgrndID}`);
        continue;
      }
    
      const EmpSpousedIDIndex = columns.indexOf('FamilyBgrndID');
      const EmpSpousedID = EmpSpousedIDIndex !== -1 ? cleanedValues[EmpSpousedIDIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM empspouse WHERE EmpSpousedID = ? LIMIT 1',
        [EmpSpousedID]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new empeducbg record for EmpSpousedID: ${EmpSpousedID}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for EmpEducBgID: ${EmpSpousedID}`, insertError);
          throw insertError;
        }
      } 

      else {
        console.log(`Updating empspouse record for EmpSpousedID: ${EmpSpousedID}`);
        const updateCols = columns.filter(col => col !== 'EmpSpousedID');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO empspouse (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }















    //empchildren
    if (/insert into\s+empchildren\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse empchildren INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for empeducbg: ${stmt}`);
        continue;
      }
    
      const FamilyBgrnd_ID_Index = columns.indexOf('FamilyBgrndID_id');
      if (FamilyBgrnd_ID_Index === -1) {
        console.warn(`FamilyBgrnd_ID column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const FamilyBgrndID = cleanedValues[FamilyBgrnd_ID_Index];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM familybgrnd WHERE FamilyBgrndID = ? LIMIT 1',
        [FamilyBgrndID]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping empspouse for EmpEducBgID due to missing FamilyBgrndID: ${FamilyBgrndID}`);
        continue;
      }
    
      const EmpSpousedIDIndex = columns.indexOf('FamilyBgrndID');
      const EmpChildrenID = EmpSpousedIDIndex !== -1 ? cleanedValues[EmpSpousedIDIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM empchildren WHERE EmpChildrenID = ? LIMIT 1',
        [EmpChildrenID]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new empeducbg record for EmpChildrenID: ${EmpChildrenID}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for EmpChildrenID: ${EmpChildrenID}`, insertError);
          throw insertError;
        }
      } 

      else {
        console.log(`Updating empspouse record for EmpChildrenID: ${EmpChildrenID}`);
        const updateCols = columns.filter(col => col !== 'EmpChildrenID');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO empchildren (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }







    // empeducbg TABLE 
    if (/insert into\s+empeducbg\s*\(/i.test(stmt)) {
      const match = stmt.match(/\(([^)]+)\)\s*VALUES\s*\((.*?)\)\s*(?:ON DUPLICATE KEY UPDATE|$)/i);
      if (!match) {
        console.warn(`Failed to parse empeducbg INSERT statement: ${stmt}`);
        continue;
      }
    
      const columns = match[1].split(',').map(c => c.trim().replace(/`/g, ''));
    
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      const valueStr = match[2].trim();
    
      for (let i = 0; i < valueStr.length; i++) {
        const char = valueStr[i];
        if (char === "'" && valueStr[i - 1] !== '\\') {
          inQuotes = !inQuotes;
          currentValue += char;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      if (currentValue) values.push(currentValue.trim());
    
      const cleanedValues = values.map(v =>
        v.trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'")
      );
    
      if (columns.length !== cleanedValues.length) {
        console.warn(`Mismatched columns (${columns.length}) and values (${cleanedValues.length}) for empprevemployer: ${stmt}`);
        continue;
      }
    
      const empCodeIdIndex = columns.indexOf('EmpCode_id');
      if (empCodeIdIndex === -1) {
        console.warn(`EmpCode_id column not found in: ${columns.join(', ')}`);
        continue;
      }
    
      const empCodeId = cleanedValues[empCodeIdIndex];
    
      const [empRows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM employee WHERE EmpCode = ? LIMIT 1',
        [empCodeId]
      );
    
      if (empRows.length === 0) {
        console.warn(`Skipping empeducbg for EmpEducBgID due to missing EmpEducBgID: ${empCodeId}`);
        continue;
      }
    
      const payrollIdIndex = columns.indexOf('Payrollid');
      const EmpEducBgID = payrollIdIndex !== -1 ? cleanedValues[payrollIdIndex] : undefined;
    
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT 1 FROM empeducbg WHERE EmpEducBgID = ? LIMIT 1',
        [EmpEducBgID]
      );
    
      if (rows.length === 0) {
        console.log(`Inserting new empeducbg record for EmpEducBgID: ${EmpEducBgID}`);
        try {
          await connection.query(stmt);
        } catch (insertError) {
          console.error(`Insert error for EmpEducBgID: ${EmpEducBgID}`, insertError);
          throw insertError;
        }
      } else {
        console.log(`Updating empeducbg record for EmpEducBgID: ${EmpEducBgID}`);
        const updateCols = columns.filter(col => col !== 'EmpEducBgID');
        const updateClause = updateCols.map(col => `${col} = VALUES(${col})`).join(', ');
        const query = `
          INSERT INTO empeducbg (${columns.join(', ')})
          VALUES (${columns.map(() => '?').join(', ')})
          ON DUPLICATE KEY UPDATE ${updateClause}
        `;
        await connection.query(query, cleanedValues);
      }
    }








    }

    await connection.query('COMMIT');
    console.log('Transaction committed');
    res.status(200).json({ message: 'SQL import completed with insert/update logic.' });
  } catch (error) {
    if (transactionStarted) {
      await connection.query('ROLLBACK');
      console.log('Transaction rolled back');
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('SQL import error:', errorMessage);
    res.status(500).json({ message: `Failed to import SQL file: ${errorMessage}` });
  } finally {
    connection.release();
  }
};