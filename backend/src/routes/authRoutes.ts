import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import { authenticateToken } from '../middleware/authorization.js';
import {
  login,
  register,
  // updateRefreshToken,
} from '../controller/authController.js';

const users = express.Router();

// users.get('/', authenticateToken, async (req: Request, res: Response) => {
//   try {
//     const users = await sql`SELECT * FROM users;`;
//     res.json({ users: users.rows });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

users.post('/register', register);

users.post('/login', login);

// users.get('/refresh_token', updateRefreshToken);

// users.delete('/refresh_token', (req: Request, res: Response) => {
//   try {
//     res.clearCookie('refresh_token');
//     res.clearCookie('refresh_token');
//     return res.status(200).json({ message: 'refresh token deleted' });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

export default users;
