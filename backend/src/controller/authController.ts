import { Request, Response } from 'express';
import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import { jwtTokens, jwtTokensPayload } from '../utils/jwt-helpers.js';
import jwt from 'jsonwebtoken';

export interface User {
  user_id?: string;
  login?: string;
  email: string;
  password: string;
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password }: User = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);

    if (!email || !password) throw new Error('email or password missing');
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;',
      [email, hashedPassword]
    );
    return res.status(200).json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password }: User = req.body;

    const usersRequest: { rows: User[] } = await pool.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );

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
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export function updateToken(req: Request, res: Response) {
  try {
    const accessToken: string = req.body.access_token;
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token is missing' });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      if (typeof user !== 'object' || user === null) {
        return res.status(500).json({ error: 'Invalid token payload' });
      }
      let tokens = jwtTokens(user as jwtTokensPayload);
      res.cookie('access_token', tokens.accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
