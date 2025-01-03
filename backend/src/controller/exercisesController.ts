import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

export async function getExercises(req: Request, res: Response) {
  try {
    const { user_id, day_id } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: user id is missing' });
    }

    const exerciseResults =
      await sql`SELECT * FROM exercises WHERE user_id = ${user_id} ORDER BY position;`;

    const exerciseFormatted = await Promise.all(
      exerciseResults.rows.map(async (el) => {
        const results =
          await sql`SELECT * FROM results WHERE exercise_id = ${el.exercise_id} ORDER BY result_date DESC;`;

        return {
          ...el,
          exerciseResults: results.rows,
        };
      })
    );

    // setTimeout(() => {
    res.json({ result: exerciseFormatted });
    // }, 5000);
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
    } = req.body;
    const { user } = res.locals;

    if (!exercise_name) {
      return res
        .status(400)
        .json({ error: 'invalid api request: workout name is missing' });
    }
    const newExercise =
      await sql`INSERT INTO exercises (user_id, exercise_name, exercise_description, position, exercise_type, exercise_external_links, previous_training_was_easy
)
VALUES (
    ${user.user_id},  
    ${exercise_name},  
    ${exercise_description},
    0,
    ${exercise_type || 'no type'},
    ${exercise_external_links},
    false
) RETURNING *;`;
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
    const newExercise = await sql`UPDATE exercises 
SET 
    exercise_name = ${exercise_name}, 
    exercise_description = ${exercise_description},
    exercise_type = ${exercise_type},
    exercise_external_links = ${exercise_external_links}
WHERE 
    exercise_id = ${exercise_id}
RETURNING *;`;
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
    const deletedDay = await sql`DELETE FROM exercises
WHERE exercise_id = ${exercise_id}
RETURNING *;`;
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
      return sql`UPDATE exercises
        SET position = ${el.position}
        WHERE exercise_id = ${el.id}
        RETURNING *;`;
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
    const newExercise = await sql`UPDATE exercises 
SET 
    previous_training_was_easy
 = ${newState}
WHERE 
    exercise_id = ${exercise_id}
RETURNING *;`;
    res.json({ exercises: newExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
