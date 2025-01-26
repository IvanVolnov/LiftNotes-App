import { Request, Response } from 'express';
import pool from '../db/db.js';

export async function getWorkouts(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }
    const userWorkouts = await pool.query(
      `SELECT * 
   FROM workouts 
   WHERE user_id = $1 
   ORDER BY position;`,
      [user_id]
    );

    // setTimeout(() => {
    res.json({ result: userWorkouts.rows });
    // }, 5000);
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
    const newWorkout = await pool.query(
      `INSERT INTO workouts (user_id, workout_name, workout_description, position)
   VALUES ($1, $2, $3, $4)
   RETURNING *;`,
      [user.user_id, workout_name, workout_description, 0]
    );

    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editWorkout(req: Request, res: Response) {
  try {
    const { workout_name, workout_description, workout_id } = req.body;

    if (!workout_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout name is missing' });
    }
    const newWorkout = await pool.query(
      `UPDATE workouts 
   SET 
       workout_name = $1, 
       workout_description = $2
   WHERE 
       workout_id = $3
   RETURNING *;`,
      [workout_name, workout_description, workout_id]
    );

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
    const newWorkout = await pool.query(
      `DELETE FROM workouts 
   WHERE workout_id = $1
   RETURNING *;`,
      [workout_id]
    );

    res.json({ workouts: newWorkout.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function reorderWorkout(req: Request, res: Response) {
  try {
    const { newPositions } = req.body;

    if (!newPositions) {
      return res.status(400).json({
        error: 'invalid api request: newPositions object is missing',
      });
    }
    type El = {
      id: number;
      position: number;
    };

    // Perform updates
    const updatePromises = newPositions.map(async (el: El) => {
      return pool.query(
        `UPDATE workouts
     SET position = $1
     WHERE workout_id = $2
     RETURNING *;`,
        [el.position, el.id]
      );
    });

    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);
    // Flatten the array of results
    const updatedWorkouts = results.flatMap((result) => result.rows);

    res.json({ workouts: updatedWorkouts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
