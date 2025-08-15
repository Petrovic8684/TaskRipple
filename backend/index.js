import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { router as userRoutes } from './routes/userRoutes.js';
import { router as boardRoutes } from './routes/boardRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to TaskRipple!');
});

app.use('/users', userRoutes);
app.use('/boards', boardRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);

export default app;
