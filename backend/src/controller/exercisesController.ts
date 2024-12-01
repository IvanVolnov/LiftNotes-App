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
    let result;

    result =
      await sql`SELECT * FROM exercises WHERE user_id = ${user_id} ORDER BY position;`;

    // setTimeout(() => {
    res.json({ result: result.rows });
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

    if (!exercise_name || exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise name or id is missing' });
    }
    const newExercise = await sql`UPDATE exercises 
SET 
    exercise_name = ${exercise_name}, 
    exercise_description = ${exercise_description},
    exercise_type = ${exercise_type},
    exercise_external_links = ${exercise_external_links},
    exercise_type = ${exercise_type}
WHERE 
    exercise_id = ${exercise_id}
RETURNING *;`;
    res.json({ exercises: newExercise.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// export async function deleteDay(req: Request, res: Response) {
//   try {
//     const { day_id } = req.body;

//     if (!day_id) {
//       return res
//         .status(400)
//         .json({ error: 'invalid api request: day id is missing' });
//     }
//     const deletedDay = await sql`DELETE FROM days
// WHERE day_id = ${day_id}
// RETURNING *;`;
//     res.json({ workouts: deletedDay.rows });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function reorderDay(req: Request, res: Response) {
//   try {
//     const { newPositions } = req.body;

//     if (!newPositions) {
//       return res.status(400).json({
//         error: 'invalid api request: newPositions object is missing',
//       });
//     }
//     type El = {
//       id: number;
//       position: number;
//     };

//     // Perform updates
//     const updatePromises = newPositions.map(async (el: El) => {
//       return sql`UPDATE days
//         SET position = ${el.position}
//         WHERE day_id = ${el.id}
//         RETURNING *;`;
//     });

//     // Wait for all updates to complete
//     const results = await Promise.all(updatePromises);
//     // Flatten the array of results
//     const updatedWorkouts = results.flatMap((result) => result.rows);

//     res.json({ workouts: updatedWorkouts });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
