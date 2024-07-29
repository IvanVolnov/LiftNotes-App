import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

const users = express.Router();

users.get('/', async (req: Request, res: Response) => {
  try {
    const users = await sql`SELECT * FROM users;`;
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post('/', async (req: Request, res: Response) => {
  try {
    const userLogin: string = req.body.userLogin;
    const userEmail: string = req.body.userEmail;
    const userPassword = await bcrypt.hash(req.body.userPassword, 10);
    if (!userLogin || !userEmail || !userPassword)
      throw new Error('login, email or password missing');
    const newUser = await sql`INSERT INTO users (login, email, password) 
VALUES 
(${userLogin}, ${userEmail}, ${userPassword}) RETURNING *;`;
    return res.status(200).json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default users;
