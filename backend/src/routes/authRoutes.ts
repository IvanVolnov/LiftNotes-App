import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens, jwtTokensPayload } from '../utils/jwt-helpers.js';
import { authenticateToken } from '../middleware/authorization.js';

const users = express.Router();

export interface User {
  user_id?: string;
  login?: string;
  email: string;
  password: string;
}

users.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const users = await sql`SELECT * FROM users;`;
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);

    if (!email || !password) throw new Error('email or password missing');
    const newUser = await sql`INSERT INTO users (email, password) 
VALUES 
(${email}, ${hashedPassword}) RETURNING *;`;
    return res.status(200).json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

users.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: User = req.body;

    const usersRequest: { rows: User[] } =
      await sql`SELECT * FROM users WHERE email = ${email};`;

    if (usersRequest.rows.length === 0) {
      return res.status(401).json('invalid email or password');
    }

    const validPassword = await bcrypt.compare(
      password,
      usersRequest.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json('invalid email or password');
    }
    let tokens = jwtTokens(usersRequest.rows[0]);
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

users.get('/refresh_token', (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token is missing' });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        if (typeof user !== 'object' || user === null) {
          return res.status(500).json({ error: 'Invalid token payload' });
        }
        let tokens = jwtTokens(user as jwtTokensPayload);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

users.delete('/refresh_token', (req: Request, res: Response) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'refresh token deleted' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default users;
