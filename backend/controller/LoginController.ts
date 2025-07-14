import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db';



export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const match = await bcrypt.compare(password, user.password || '');

    if (!match) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    res.status(200).json({message: 'Login successful',user: { id: user.id, username: user.username },});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
