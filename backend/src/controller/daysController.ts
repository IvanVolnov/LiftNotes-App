import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

export async function getDays(req: Request, res: Response) {
  try {
    const { workout_id } = req.body;

    if (!workout_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }
    const result =
      await sql`SELECT * FROM days WHERE workout_id = ${workout_id} ORDER BY position;`;
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
    const newDay =
      await sql`INSERT INTO days (workout_id, day_name, day_description, position)
VALUES (
    ${workout_id},  
    ${day_name},  
    ${day_description},
    0  
) RETURNING *;`;
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
    const editedDay = await sql`UPDATE days 
SET 
    day_name = ${day_name}, 
    day_description = ${day_description} 
WHERE 
    day_id = ${day_id}
RETURNING *;`;
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
    const deletedDay = await sql`DELETE FROM days 
WHERE day_id = ${day_id}
RETURNING *;`;
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
      return sql`UPDATE days
        SET position = ${el.position}
        WHERE day_id = ${el.id}
        RETURNING *;`;
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
      return sql`INSERT INTO days_exercises (day_id, exercise_id, position)
VALUES (
    ${dayId},  
    ${exerciseId},
    0
) RETURNING *;`;
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
    const deletedExercise = await sql`DELETE FROM days_exercises
WHERE exercise_id = ${exercise_id} AND day_id = ${day_id}
RETURNING *;`;
    res.json({ deletedExercise: deletedExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
