import express, { json, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import users from './routes/authRoutes.js';

const app = express();

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = { credentials: true, origin: process.env.URL || '*' };
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.send(`hello, this is server for liftnores app`);
});

app.get('/api/v1/users', (req, res) => {
  try {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jan Doerty' },
      { id: 3, name: 'Doe Jonson' },
    ];

    return res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
});

app.use('/api/users', users);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
