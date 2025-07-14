import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getBranches = async(req: Request, res: Response) =>{
    try {
        const branches = await prisma.branch.findMany({
            orderBy: {
                branchCode: "asc",
            },
        });
        res.status(200).json(branches);
    }catch (error){
        console.error("Error fetching branches:", error);
        res.status(500).json({message: "Internal server error"});
    }
}