import { Request, Response } from 'express';
import pool from '../db/db.js';

export async function getDays(req: Request, res: Response) {
  try {
    const { workout_id } = req.body;

    if (!workout_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }
    const result = await pool.query(
      'SELECT * FROM days WHERE workout_id = $1 ORDER BY position;',
      [workout_id]
    );
    // setTimeout(() => {
    res.json({ result: result.rows });
    // }, 5000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createDay(req: Request, res: Response) {
  try {
    const { day_name, day_description, workout_id } = req.body;

    if (!day_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout name is missing' });
    }
    const newDay = await pool.query(
      `INSERT INTO days (workout_id, day_name, day_description, position)
   VALUES ($1, $2, $3, $4) RETURNING *;`,
      [workout_id, day_name, day_description, 0]
    );

    res.json({ days: newDay.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editDay(req: Request, res: Response) {
  try {
    const { day_name, day_description, day_id } = req.body;

    if (!day_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: day name is missing' });
    }
    const editedDay = await pool.query(
      `UPDATE days 
   SET 
       day_name = $1, 
       day_description = $2 
   WHERE 
       day_id = $3
   RETURNING *;`,
      [day_name, day_description, day_id]
    );

    res.json({ workouts: editedDay.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteDay(req: Request, res: Response) {
  try {
    const { day_id } = req.body;

    if (!day_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: day id is missing' });
    }
    const deletedDay = await pool.query(
      `DELETE FROM days 
   WHERE day_id = $1
   RETURNING *;`,
      [day_id]
    );

    res.json({ workouts: deletedDay.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function reorderDay(req: Request, res: Response) {
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
        `UPDATE days
     SET position = $1
     WHERE day_id = $2
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

// OPREATIONS WITH EXERCISES

export async function addExercise(req: Request, res: Response) {
  try {
    const { exercises, dayId } = req.body;

    if (!exercises || !dayId) {
      return res.status(400).json({
        error: 'invalid api request: dependencies data name is missing',
      });
    }

    // Perform updates
    const updatePromises = exercises.map(async (exerciseId: string) => {
      return pool.query(
        `INSERT INTO days_exercises (day_id, exercise_id, position)
     VALUES ($1, $2, $3)
     RETURNING *;`,
        [dayId, exerciseId, 0]
      );
    });

    const results = await Promise.all(updatePromises);
    // Flatten the array of results
    const addedExercises = results.flatMap((result) => result.rows);
    res.json({ addedExercises });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteExerciseFormDay(req: Request, res: Response) {
  try {
    const { day_id, exercise_id } = req.body;

    if (!exercise_id || !day_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise or day id is missing' });
    }
    const deletedExercise = await pool.query(
      `DELETE FROM days_exercises
   WHERE exercise_id = $1 AND day_id = $2
   RETURNING *;`,
      [exercise_id, day_id]
    );

    res.json({ deletedExercise: deletedExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
