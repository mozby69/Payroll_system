import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getFilterEmployees = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      perPage = '10',
      search = '',
      branchCode = '',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limit = Math.max(1, parseInt(perPage as string, 10) || 10);
    const skip = (pageNum - 1) * limit;

    // Build the reusable where clause with mode for findMany
    const where: any = {};

    if ((search as string).trim()) {
      where.OR = [
        {
          Firstname: {
            contains: search as string,
          },
        },
        {
          Lastname: {
            contains: search as string,
          },
        },
      ];
    }

    if ((branchCode as string).trim()) {
      where.BranchCode = {
        code: branchCode,
      };
    }

    // Create a copy of the where object for count() without `mode`
    const countWhere = JSON.parse(JSON.stringify(where));
    if (countWhere.OR) {
      countWhere.OR = countWhere.OR.map((condition: any) => {
        const key = Object.keys(condition)[0];
        return {
          [key]: {
            contains: condition[key].contains,
          },
        };
      });
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limit,
        include: {
          BranchCode: true,
        },
      }),
      prisma.employee.count({ where: countWhere }),
    ]);

    res.status(200).json({
      success: true,
      data: employees,
      total,
      perPage: limit,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("🔥 Error fetching employees:", error.message);
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
