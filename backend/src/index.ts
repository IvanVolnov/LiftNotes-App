import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import users from './routes/authRoutes.js';
import workouts from './routes/workoutsRoutes.js';
import days from './routes/daysRoutes.js';
import exercises from './routes/exercisesRoutes.js';
import results from './routes/resultsRoutes.js';
import pool from './db/db.js';
import demo from './routes/demoDataRoutes.js';

const app = express();

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.json({ message: `hello, this is server for liftnotes app` });
});

app.use('/api/users', users);
app.use('/api/workouts', workouts);
app.use('/api/days', days);
app.use('/api/exercises', exercises);
app.use('/api/results', results);
app.use('/api/demoAccount', demo);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

process.on('SIGINT', async () => {
  console.log('Closing database pool...');
  await pool.end();
  console.log('Database pool closed. Exiting...');
  process.exit(0);
});
