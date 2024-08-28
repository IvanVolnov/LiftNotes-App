import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

export async function getWorkouts(req: Request, res: Response) {
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

export async function createWorkout(req: Request, res: Response) {
  try {
    const { workout_name, workout_description } = req.body;
    const { user } = res.locals;

    if (!workout_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout name is missing' });
    }
    const newWorkout =
      await sql`INSERT INTO workouts (user_id, workout_name, workout_description)
VALUES (
    ${user.user_id},  -- Replace with the actual UUID of the user
    ${workout_name},  -- Replace with the desired workout name
    ${workout_description}  -- Replace with the desired workout description or remove if not needed
) RETURNING *;`;
    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
