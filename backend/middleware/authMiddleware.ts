import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ error: "Access denied, no token provided" });
    return; // 👈 ensure it returns void
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next(); // 👈 still void
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
    return; // 👈 important to explicitly return here too
  }
};
