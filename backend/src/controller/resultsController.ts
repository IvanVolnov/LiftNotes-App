import { Request, Response } from 'express';
import { sql } from '@vercel/postgres';

export async function getResults(req: Request, res: Response) {
  try {
    const { exercise_id } = req.body;

    if (!exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise id is missing' });
    }
    let result;

    result =
      await sql`SELECT * FROM results WHERE exercise_id = ${exercise_id};`;

    // setTimeout(() => {
    res.json({ result: result.rows });
    // }, 5000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createResult(req: Request, res: Response) {
  try {
    const { exercise_id, result_date, result_sets } = req.body;

    if (!result_date || !result_sets || !exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: result data is missing' });
    }
    const newResult =
      await sql`INSERT INTO results (exercise_id, result_date, result_sets
)
VALUES (
    ${exercise_id},  
    ${result_date},  
    ${result_sets}
) RETURNING *;`;
    res.json({ results: newResult.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function editResult(req: Request, res: Response) {
  try {
    const { result_id, result_date, result_sets } = req.body;

    if (!result_date || !result_sets || !result_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: result data is missing' });
    }

    const newResult = await sql`UPDATE results 
SET 
    result_date = ${result_date}, 
    result_sets = ${result_sets},
    
WHERE 
    result_id = ${result_id}
RETURNING *;`;
    res.json({ exercises: newResult.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteResult(req: Request, res: Response) {
  try {
    const { result_id } = req.body;

    if (!result_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: result id is missing' });
    }
    const deletedResult = await sql`DELETE FROM results
WHERE result_id = ${result_id}
RETURNING *;`;
    res.json({ results: deletedResult.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
