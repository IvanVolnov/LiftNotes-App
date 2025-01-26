import { Request, Response } from 'express';
import pool from '../db/db.js';

export async function getExercises(req: Request, res: Response) {
  try {
    const { user_id, day_id, isAddEx } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }

    let exerciseResults;

    if (day_id && !isAddEx) {
      exerciseResults = await pool.query(
        `SELECT 
      days_exercises.position,
      exercises.exercise_id,
      exercises.user_id,
      exercises.created_at,
      exercises.exercise_name,
      exercises.exercise_type,
      exercises.exercise_description,
      exercises.exercise_external_links,
      exercises.previous_training_was_easy
   FROM 
      days_exercises
   JOIN 
      exercises ON days_exercises.exercise_id = exercises.exercise_id
   WHERE 
      days_exercises.day_id = $1
   ORDER BY 
      position;`,
        [day_id]
      );
    }

    if (isAddEx) {
      exerciseResults = await pool.query(
        `SELECT *
   FROM exercises
   WHERE user_id = $1
     AND exercise_id NOT IN (
       SELECT e.exercise_id
       FROM days_exercises de
       JOIN exercises e ON de.exercise_id = e.exercise_id
       WHERE de.day_id = $2
     )
   ORDER BY position;`,
        [user_id, day_id]
      );
    }

    if (!day_id) {
      exerciseResults = await pool.query(
        `SELECT * 
   FROM exercises 
   WHERE user_id = $1 
   ORDER BY position;`,
        [user_id]
      );
    }

    const exerciseFormatted = await Promise.all(
      exerciseResults.rows.map(async (el) => {
        const results = await pool.query(
          `SELECT * 
   FROM results 
   WHERE exercise_id = $1 
   ORDER BY result_date DESC;`,
          [el.exercise_id]
        );

        return {
          ...el,
          exerciseResults: results.rows,
        };
      })
    );

    res.json({ result: exerciseFormatted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createExercise(req: Request, res: Response) {
  try {
    const {
      exercise_name,
      exercise_description,
      exercise_type,
      exercise_external_links,
      day_id,
    } = req.body;
    const { user } = res.locals;

    if (!exercise_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise name is missing' });
    }
    const newExercise = await pool.query(
      `INSERT INTO exercises (
     user_id, 
     exercise_name, 
     exercise_description, 
     position, 
     exercise_type, 
     exercise_external_links, 
     previous_training_was_easy
   ) 
   VALUES ($1, $2, $3, $4, $5, $6, $7) 
   RETURNING *;`,
      [
        user.user_id,
        exercise_name,
        exercise_description,
        0,
        exercise_type || 'no type',
        exercise_external_links,
        false,
      ]
    );

    if (day_id) {
      await pool.query(
        `INSERT INTO days_exercises (day_id, exercise_id, position)
   VALUES ($1, $2, $3)
   RETURNING *;`,
        [day_id, newExercise.rows[0].exercise_id, 0]
      );
    }

    res.json({ exercises: newExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editExercise(req: Request, res: Response) {
  try {
    const {
      exercise_id,
      exercise_name,
      exercise_description,
      exercise_type,
      exercise_external_links,
    } = req.body;

    if (!exercise_name || !exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise name or id is missing' });
    }
    const newExercise = await pool.query(
      `UPDATE exercises 
   SET 
       exercise_name = $1, 
       exercise_description = $2,
       exercise_type = $3,
       exercise_external_links = $4
   WHERE 
       exercise_id = $5
   RETURNING *;`,
      [
        exercise_name,
        exercise_description,
        exercise_type,
        exercise_external_links,
        exercise_id,
      ]
    );

    res.json({ exercises: newExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteExercise(req: Request, res: Response) {
  try {
    const { exercise_id } = req.body;

    if (!exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: result id is missing' });
    }
    const deletedDay = await pool.query(
      `DELETE FROM exercises
   WHERE exercise_id = $1
   RETURNING *;`,
      [exercise_id]
    );

    res.json({ exercises: deletedDay.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function reorderExercise(req: Request, res: Response) {
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
        `UPDATE exercises
     SET position = $1
     WHERE exercise_id = $2
     RETURNING *;`,
        [el.position, el.id]
      );
    });

    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);
    // Flatten the array of results
    const updatedExercises = results.flatMap((result) => result.rows);

    res.json({ exercises: updatedExercises });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function setPrevExercise(req: Request, res: Response) {
  try {
    const { exercise_id, newState } = req.body;

    if (typeof newState !== 'boolean' || !exercise_id) {
      return res.status(400).json({
        error: 'invalid api request: exercise id or invalid exercise data',
      });
    }
    const newExercise = await pool.query(
      `UPDATE exercises 
   SET 
       previous_training_was_easy = $1
   WHERE 
       exercise_id = $2
   RETURNING *;`,
      [newState, exercise_id]
    );

    res.json({ exercises: newExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
