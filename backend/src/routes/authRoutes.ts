import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const users = express.Router();

interface User {
  login?: string;
  email: string;
  password: string;
}

users.get('/', async (req: Request, res: Response) => {
  try {
    const users = await sql`SELECT * FROM users;`;
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post('/register', async (req: Request, res: Response) => {
  try {
    const { login, email, password }: User = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);

    if (!login || !email || !password)
      throw new Error('login, email or password missing');
    const newUser = await sql`INSERT INTO users (login, email, password) 
VALUES 
(${login}, ${email}, ${hashedPassword}) RETURNING *;`;
    return res.status(200).json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;

    const users = await sql`SELECT * FROM users WHERE email = ${email};`;

    if (users.rows.length === 0) {
      return res.status(401).json('invalid email or password');
    }

    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json('invalid email or password');
    }

    return res.status(200).json('Success');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default users;
