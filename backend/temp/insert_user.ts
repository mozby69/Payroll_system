// insertUser.ts
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const insertUser = async () => {
  const username = 'admin'; 
  const rawPassword = '123';

  try {
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "", 
        database: "payroll_db",
      });
      
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const [result] = await db.execute(
      'INSERT INTO user (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    console.log('✅ User inserted successfully!', result);
    await db.end();
  } catch (err) {
    console.error('❌ Error inserting user:', err);
  }
};

insertUser();
