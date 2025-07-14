import { prisma } from '../config/db';
import { Request, Response } from 'express';

export const getEmployees = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string)?.trim().toLowerCase() || "";
      const offset = (page - 1) * limit;
  
      const whereClause = search
      ? {
          OR: [
            { EmpCode: { contains: search.toLowerCase() } },
            { Firstname: { not: null, contains: search.toLowerCase() } },
            { Middlename: { not: null, contains: search.toLowerCase() } },
            { Lastname: { not: null, contains: search.toLowerCase() } },
            { Gender: { not: null, contains: search.toLowerCase() } },
            { CivilStatus: { not: null, contains: search.toLowerCase() } },

          ],
        }
      : {};
    
  
      const [employees, total] = await Promise.all([
        prisma.employee.findMany({
          where: whereClause,
          skip: offset,
          take: limit,
          select: {
            EmpCode: true,
            Firstname: true,
            Middlename:true,
            Lastname:true,
            Gender: true,
            DateofBirth: true,
            CivilStatus: true,
          },
          orderBy: {
            EmpCode: "asc",
          },
        }),
        prisma.employee.count({ where: whereClause }),
      ]);
  
      const totalPages = Math.ceil(total / limit);
  
      res.status(200).json({
        data: employees,
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
  

  




export const DisplayAllEmployees = async(req:Request, res:Response) => {
  try{
      const search = (req.query.search as string)?.trim().toLowerCase() || "";
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = (page - 1) * limit;

    const whereClause = search
    ? {
        OR: [
          { EmpCode: { contains: search.toLowerCase() } },
          { Firstname: { not: null, contains: search.toLowerCase()} },
          { Middlename: { not: null, contains: search.toLowerCase()} },
          { Lastname: { not: null, contains: search.toLowerCase()} },
        ],
      }
    : {};


    const all_employees = await prisma.employee.findMany({
      where:whereClause,
      skip: offset,
      take: limit,
      select:{
        EmpCode:true,
        Firstname:true,
        Middlename:true,
        Lastname:true,
        EmployementDate:true,
        Department:true,
        Address:true,
        BranchCodeId:true,
        Position:true,
        employeepayroll:{
          select:{
            basic_salary:true,
          }
        }
      },
      orderBy:{
        EmpCode:"desc",
      },
    });
    res.status(200).json(all_employees);
  }
  catch(error) {
    console.error("error occured: ",error);
    res.status(500).json({message:"server error occured"});
  }

};