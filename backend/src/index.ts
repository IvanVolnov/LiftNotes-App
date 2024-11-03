import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import users from './routes/authRoutes.js';
import workouts from './routes/workoutsRoutes.js';
import days from './routes/daysRoutes.js';

const app = express();

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.json({ message: `hello, this is server for liftnores app` });
});

app.use('/api/users', users);
app.use('/api/workouts', workouts);
app.use('/api/days', days);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
