import express, { json, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import { sql } from '@vercel/postgres';

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

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await sql`SELECT * FROM users;`;
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (request: Request, response: Response) => {
  try {
    const userLogin = request.query.userLogin as string;
    const userEmail = request.query.userEmail as string;
    const userPassword = request.query.userPassword as string;
    if (!userLogin || !userEmail || !userPassword)
      throw new Error('Pet and owner names required');
    await sql`INSERT INTO users (login, email, password) 
VALUES 
(${userLogin}, ${userEmail}, ${userPassword});`;
    const pets = await sql`SELECT * FROM users;`;
    return response.status(200).json({ pets });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
