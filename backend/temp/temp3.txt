import { prisma } from '../config/db';
import { Request, Response } from 'express';
import { Parser } from "json2csv";
import { promises as fs } from "fs";
import path from "path";
import  Computation from '../components/formula';
import { getDistinctPayCodesForYear } from '../components/rawSQL';
import { getMostRecentPayCode } from '../components/prepare_payroll/displayRecentDate';
import { EmployeeArchiveRow } from '../components/prepare_payroll/types';



export const getPreparePayroll = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string)?.trim().toLowerCase() || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const year = new Date().getFullYear();
    const payCodeOptionsResult = await getDistinctPayCodesForYear(year);
    const selectedPayCodeParam = req.query.paycode as string | undefined;

    let selectedPayCode = selectedPayCodeParam;
    if(!selectedPayCode){
      selectedPayCode = getMostRecentPayCode(payCodeOptionsResult);
    }

    const whereClause = {
      AND: [
        selectedPayCode ? { PayCode: selectedPayCode } : {},
        search
          ? {
              OR: [
                { PayCode: { contains: search } },
                { EmpCodeId: { contains: search } },
              ],
            }
          : {},
      ],
    };

    const [rawEmployeesPayroll, total,sss_contributions] = await Promise.all([
      prisma.employeeSummary.findMany({
        where: whereClause,
        skip:offset,
        take:limit,
        select: {
          PayCode: true,
          TotalHoursWorked: true,
          LateCount: true,
          TotalAbsentHours: true,
          TotalUndertime: true,
          TotalOvertime: true,
          OvertimeAtt:true,
          NightShiftAtt:true,
          RegularAtt:true,
          NightShiftOtAtt:true,
          EmpCodeId: true,
          EmpCode: {
            select: {
              employeepayroll: {
                orderBy: {
                  payroll_id: "desc",
                  
                },
                take: 1,
                select: {
                  basic_salary: true,
                  GrossPay:true,
                },
              },

              pagibig_list:{
                select:{
                  pagibig_employee_share:true,
                }
              }
            },
          },
        },
        orderBy: {
          EmpCodeId: "asc",
        },
      }),
      prisma.employeeSummary.count({ where: whereClause }),
      prisma.sSS_Contributions.findMany({
        select:{
          start_range:true,
          end_range:true,
          employee_share:true,
        },
      }),
    ]);

  

    const flattenedData = rawEmployeesPayroll.map((emp) => {
      const basic_salary = parseFloat(emp.EmpCode?.employeepayroll?.[0]?.basic_salary?.toString() || "0");
      const sss = sss_contributions.find((range) => {
        
        if (range.start_range === null || range.end_range === null) return false;
        const start = parseFloat(range.start_range.toString());
        const end = parseFloat(range.end_range.toString());
        return basic_salary >= start && basic_salary <= end;
      });
      

      const computed = Computation.all({
        PayCode: emp.PayCode ?? "",
        EmpCodeId: emp.EmpCodeId ?? "",
        LateCount: emp.LateCount ?? "",                
        TotalAbsentHours: emp.TotalAbsentHours ?? "",    
        TotalUndertime: emp.TotalUndertime ?? "",
        TotalOvertime: emp.TotalOvertime ?? "",
        OvertimeAtt: emp.OvertimeAtt ? JSON.stringify(emp.OvertimeAtt) : undefined,      
        NightShiftAtt: emp.NightShiftAtt ? JSON.stringify(emp.NightShiftAtt) : undefined, 
        RegularAtt: emp.RegularAtt ? JSON.stringify(emp.RegularAtt) : undefined,   
        NightShiftOtAtt: emp.NightShiftOtAtt ? JSON.stringify(emp.NightShiftOtAtt) : undefined, 
        basic_salary: emp.EmpCode?.employeepayroll?.[0]?.basic_salary?.toString() ?? "0", 
        GrossPay: emp.EmpCode?.employeepayroll?.[0]?.GrossPay?.toString() ?? "0",  
      });
    
      return {
        PayCode: emp.PayCode,
        TotalHoursWorked: emp.TotalHoursWorked,
        LateCount: emp.LateCount,
        LateDeduction: computed.late_result, 
        dsfds:computed.totalOvertimeAmount,
        TotalAbsentHours: emp.TotalAbsentHours,
        TotalUndertime: emp.TotalUndertime,
        TotalOvertime: emp.TotalOvertime,
        OvertimeAtt: emp.OvertimeAtt,
        NightShiftAtt: emp.NightShiftAtt,
        EmpCodeId: emp.EmpCodeId,
        RegularAtt: emp.RegularAtt,
        NightShiftOtAtt: emp.NightShiftOtAtt,
        basic_salary: emp.EmpCode?.employeepayroll?.[0]?.basic_salary ?? "0",
        GrossPay: emp.EmpCode?.employeepayroll?.[0]?.GrossPay ?? "0",
        sss_employee_share: sss?.employee_share ?? 0, 
        pagibig_employee_share:emp.EmpCode?.pagibig_list?.[0]?.pagibig_employee_share ?? "0",
      };
    });
    
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: flattenedData, 
      payCodeOptions: payCodeOptionsResult.map((p) => p.PayCode),
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const updatePayrollEntry = async (req: Request, res: Response): Promise<void> => {
  const { payCode, empCodeId } = req.params;


  const existing = await prisma.employeeSummary.findUnique({
    where: {
      PayCode_EmpCodeId: {
        PayCode: payCode,
        EmpCodeId: empCodeId,
      },
    },
  });

  if (!existing) {
    res.status(404).json({ message: "Record not found with composite key." });
    return; 
  }

  const {TotalHoursWorked,LateCount,TotalAbsentHours,TotalUndertime,TotalOvertime} = req.body || {};

  const basic_salary = req.body?.EmpCode?.employeepayroll?.[0]?.basic_salary;

  try {
  
    await prisma.employeeSummary.update({
      where: {
        PayCode_EmpCodeId: {
          PayCode: payCode,
          EmpCodeId: empCodeId,
        },
      },
      data: {TotalHoursWorked,LateCount,TotalAbsentHours,TotalUndertime,TotalOvertime},
    });


    if (basic_salary !== undefined) {
      const latestPayroll = await prisma.employee_payroll.findFirst({
        where: {
          EmpCodeId: empCodeId,
        },
        orderBy: {
          payroll_id: "desc",
        },
      });

      if (latestPayroll) {
        await prisma.employee_payroll.update({
          where: {
            payroll_id: latestPayroll.payroll_id,
          },
          data: {
            basic_salary,
          },
        });

        console.log(`Updated salary to ${basic_salary} for payroll_id: ${latestPayroll.payroll_id}`);
      } else {
        console.warn(`No employee_payroll found for ${empCodeId}, unable to update basic_salary`);
      }
    }

    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Prisma update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};







export const savePayrollToArchive = async (req: Request, res: Response): Promise<void> => {
  const { paycode, totals, computedData } = req.body;

  if (!paycode || !computedData) {
    res.status(400).json({ message: "PayCode and computedData are required." });
    return;
  }

  try {

    const exists = await prisma.payslipArchive.findFirst({
      where: { PayCycle: paycode },
    });

    if (exists) {
       res.status(409).json({
        message: `Payroll for "${paycode}" has already been archived.`,
      });
    }
    
    const csvDir = path.join(__dirname, '..', 'uploads', 'payroll_archives');
    const fileName = `archive_${paycode}.csv`;
    const filePath = path.join(csvDir, fileName);

    const parser = new Parser();
    const csv = parser.parse(computedData);

    await fs.writeFile(filePath, csv);

    await prisma.payslipArchive.create({
      data: {
        PayCycle: paycode,
        Path: `uploads/payroll_archives/${fileName}`,
        Total_Late: totals.Total_Late,
        Total_Absent: totals.Total_Absent,
        Total_OverTimePay: totals.Total_OverTimePay,
      },
    });


    await prisma.employeePayrollArchive.createMany({
      data: computedData.map((emp: EmployeeArchiveRow) => ({
        PayCode: paycode,
        Late: (emp.LateCount ?? 0),
        Absent: (emp.TotalAbsentHours ?? 0),
        Overtime: (emp.TotalOvertime ?? 0),
        Grosspay: (emp.GrossPay ?? 0),
        Netpay: (emp.Netpay ?? 0),
        Basic_salary: (emp.basic_salary ?? 0),
        SSS_share: (emp.sss_employee_share ?? 0),
        Pagibig_share: (emp.pagibig_employee_share ?? 0),
        Philhealth_share: (emp.philhealth ?? 0),
        EmpCodeId: emp.EmpCodeId,
      })),
    });


    res.status(200).json({ message: 'Payroll archived and CSV saved successfully.' });
  } catch (error) {
    console.error('Error archiving payroll:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};






export const getAvailableEmployees = async (req:Request, res:Response) => {
  try{
    const availableEmployees = await prisma.employee.findMany({
      where:{
        employeepayroll:{
          none:{},
        },
      },
      select: {
        EmpCode:true,
      },
    });

    res.json(availableEmployees);
  }catch(error){
    console.error('[getAvailableEmployees]',error);
    res.status(500).json({message:'server error'});
  }
};



export const SaveNewEmployeePayroll = async (req: Request, res: Response):Promise<void> => {
  try {
    const {EmpCodeId,basic_salary,pagibig_employee_share,pagibig_employer_share} = req.body;

    if (!EmpCodeId || !basic_salary) {
       res.status(400).json({ message: "Missing required fields" });
    }

    const salary = parseFloat(basic_salary);

    const pagibig = await prisma.pagIbig_List.create({
      data: {
        EmpCodeId,
        pagibig_employee_share: pagibig_employee_share ? parseFloat(pagibig_employee_share): undefined,
        pagibig_employer_share: pagibig_employer_share ? parseFloat(pagibig_employer_share): undefined,
      },
    });

    const result = await prisma.employee_payroll.create({
      data: {
        EmpCodeId,
        basic_salary: salary,
        pagibigId: pagibig.pagibig_id, 
      },
    });

     res.status(201).json(result);
  } catch (err) {
    console.error("payroll save error", err);
     res.status(500).json({ message: "Failed to save payroll" });
  }
};




export const getAllEmployeesPayrollByPayCode = async (req: Request, res: Response):Promise<void> => {
  try {
    const selectedPayCode = req.query.paycode as string;

    if (!selectedPayCode) {
       res.status(400).json({ message: "Missing paycode parameter" });
    }

    const whereClause = {
      PayCode: selectedPayCode,
    };

    const [rawEmployeesPayroll, sss_contributions] = await Promise.all([
      prisma.employeeSummary.findMany({
        where: whereClause,
        select: {
          PayCode: true,
          TotalHoursWorked: true,
          LateCount: true,
          TotalAbsentHours: true,
          TotalUndertime: true,
          TotalOvertime: true,
          OvertimeAtt: true,
          NightShiftAtt: true,
          RegularAtt: true,
          NightShiftOtAtt: true,
          EmpCodeId: true,
          EmpCode: {
            select: {
              employeepayroll: {
                orderBy: { payroll_id: "desc" },
                take: 1,
                select: {
                  basic_salary: true,
                  GrossPay: true,
                },
              },
              pagibig_list:{
                select:{
                  pagibig_employee_share:true,
                }
              }
            },
          },
        },
        orderBy: {
          EmpCodeId: "asc",
        },
      }),
      prisma.sSS_Contributions.findMany({
        select: {
          start_range: true,
          end_range: true,
          employee_share: true,
        },
      }),
    ]);

    const flattenedData = rawEmployeesPayroll.map((emp) => {
      const basic_salary = parseFloat(emp.EmpCode?.employeepayroll?.[0]?.basic_salary?.toString() || "0");

      const sss = sss_contributions.find((range) => {
        if (range.start_range === null || range.end_range === null) return false;
        const start = parseFloat(range.start_range.toString());
        const end = parseFloat(range.end_range.toString());
        return basic_salary >= start && basic_salary <= end;
      });

      return {
        PayCode: emp.PayCode,
        EmpCodeId: emp.EmpCodeId,
        TotalHoursWorked: emp.TotalHoursWorked,
        LateCount: emp.LateCount,
        TotalAbsentHours: emp.TotalAbsentHours,
        TotalUndertime: emp.TotalUndertime,
        TotalOvertime: emp.TotalOvertime,
        OvertimeAtt: emp.OvertimeAtt,
        NightShiftAtt: emp.NightShiftAtt,
        RegularAtt: emp.RegularAtt,
        NightShiftOtAtt: emp.NightShiftOtAtt,
        basic_salary: emp.EmpCode?.employeepayroll?.[0]?.basic_salary ?? "0",
        GrossPay: emp.EmpCode?.employeepayroll?.[0]?.GrossPay ?? "0",
        sss_employee_share: sss?.employee_share ?? 0,
        pagibig_employee_share:emp.EmpCode?.pagibig_list?.[0]?.pagibig_employee_share ?? "0",
      };
    });

    res.status(200).json(flattenedData);
  } catch (error) {
    console.error("Error fetching all employees payroll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getPayrollParameter = async (req: Request, res: Response):Promise<void> => {
  try{
    const get_philhealth_rate = await prisma.payroll_Parameters.findFirst({
      select: {
        SettingPercentage: true,
      },
    });
    res.status(200).json(get_philhealth_rate)
  }
  catch(error){
    console.error("Error occured:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

