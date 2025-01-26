import { Request, Response } from 'express';
import pool from '../db/db.js';

export async function getResults(req: Request, res: Response) {
  try {
    const { exercise_id } = req.body;

    if (!exercise_id) {
      return res
        .status(400)
        .json({ error: 'invalid api request: exercise id is missing' });
    }
    let result;

    result = await pool.query(
      `SELECT * 
   FROM results 
   WHERE exercise_id = $1;`,
      [exercise_id]
    );

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
    const newResult = await pool.query(
      `INSERT INTO results (exercise_id, result_date, result_sets)
   VALUES ($1, $2, $3)
   RETURNING *;`,
      [exercise_id, result_date, result_sets]
    );

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

    const newResult = await pool.query(
      `UPDATE results 
   SET 
       result_date = $1, 
       result_sets = $2
   WHERE 
       result_id = $3
   RETURNING *;`,
      [result_date, result_sets, result_id]
    );

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
    const deletedResult = await pool.query(
      `DELETE FROM results
   WHERE result_id = $1
   RETURNING *;`,
      [result_id]
    );

    res.json({ results: deletedResult.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
