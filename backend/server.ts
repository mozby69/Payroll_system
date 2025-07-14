// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import protecedRoutes from './routes/protected';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', protecedRoutes);

app.listen(3001, () => {
  console.log('✅ Server running on port 3001');
});



