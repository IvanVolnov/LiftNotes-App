import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

export default async function getWorkouts(req: Request, res: Response) {
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
}
