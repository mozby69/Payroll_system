import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Make sure this is imported

const JWT_SECRET = process.env.JWT_SECRET!;
export const registerUser = async (req: Request, res: Response) : Promise<void> =>{
    try{
        const {email, username, password, role} = req.body;
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
          }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
              email,
              username,
              password: hashedPassword,
              role,
            },
          });
          res.status(201).json({message: "User registered successfully"});
    }catch(error) {
        res.status(500).json({error: "Internal server error"});
    }
};

export const LoginUser = async (req: Request, res: Response) : Promise<void> =>{
  try{
      const {username, password}  = req.body;
      const user = await prisma.user.findUnique({where: {username}});
      if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
           JWT_SECRET, 
           {expiresIn: "1d"});
        res.cookie("token", token,{
          httpOnly: true,
          sameSite: "strict",
          secure: false,
          maxAge: 864000000 // 1 day in milliseconds
        })
        res.json({message: "Login successful", user: {id: user.id, username: user.username, email: user.email}});
    
  }catch(error) { 
    res.status(500).json({error: "Internal server error"});
  }
}