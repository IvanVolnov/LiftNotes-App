import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import { authenticateToken } from '../middleware/authorization.js';

const workouts = express.Router();

workouts.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }
    const userWorkouts =
      await sql`SELECT * FROM workouts WHERE user_id = ${user_id};`;
    res.json({ workouts: userWorkouts.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create new workout

// copy workout

// edit workout

// delete workout

export default workouts;
