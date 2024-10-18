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
      await sql`INSERT INTO workouts (user_id, workout_name, workout_description, position)
VALUES (
    ${user.user_id},  
    ${workout_name},  
    ${workout_description},
    0  
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

export async function reorderWorkout(req: Request, res: Response) {
  try {
    const { newPositions } = req.body;

    if (!newPositions) {
      return res.status(400).json({
        error:
          'invalid api request: workout id  or newPositions object is missing',
      });
    }
    type El = {
      id: number;
      position: number;
    };

    // Perform updates
    const updatePromises = newPositions.map(async (el: El) => {
      return sql`UPDATE workouts
        SET position = ${el.position}
        WHERE workout_id = ${el.id}
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
