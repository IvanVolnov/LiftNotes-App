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
      await sql`SELECT * FROM workouts WHERE user_id = ${user_id} ORDER BY position;`;
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
    ${user.user_id},  
    ${workout_name},  
    ${workout_description}  
) RETURNING *;`;
    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editWorkout(req: Request, res: Response) {
  try {
    const { workout_name, workout_description, workout_id } = req.body;
    const { user } = res.locals;

    if (!workout_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout name is missing' });
    }
    const newWorkout = await sql`UPDATE workouts 
SET 
    workout_name = ${workout_name}, 
    workout_description = ${workout_description} 
WHERE 
    workout_id = ${workout_id}
RETURNING *;`;
    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteWorkout(req: Request, res: Response) {
  try {
    const { workout_id } = req.body;

    if (!workout_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout id is missing' });
    }
    const newWorkout = await sql`DELETE FROM workouts 
WHERE workout_id = ${workout_id}
RETURNING *;`;
    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
