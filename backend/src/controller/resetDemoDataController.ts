import { Request, Response } from 'express';
import pool from '../db/db.js';
import demoExerisesQuery from '../demoData/demoExercisesQuery.js';
import demoWorkoutsQuery from '../demoData/demoWorkoutsQuery.js';
import demoDaysQuery from '../demoData/demoDaysQuery.js';
import demoDaysExConnections from '../demoData/demoConnections.js';
import generateDemoResults from '../demoData/generateDemoResults.js';

export async function reset(req: Request, res: Response) {
  try {
    const demoUserId = '12570d37-d9d3-464e-9c08-f4aa27472abb';
    const resultsQuery = generateDemoResults();
    // Delete all prev data
    await pool.query(
      `DELETE FROM exercises
WHERE user_id = $1;`,
      [demoUserId]
    );

    await pool.query(
      `DELETE FROM workouts
WHERE user_id = $1;`,
      [demoUserId]
    );

    // Add demo data to tables

    // reset Exercises
    await pool.query(demoExerisesQuery, [demoUserId]);

    // reset Workouts
    await pool.query(demoWorkoutsQuery, [demoUserId]);

    // reset Days
    await pool.query(demoDaysQuery);

    // reset Day-Execise connections
    await pool.query(demoDaysExConnections);

    // reset Results
    await pool.query(resultsQuery);

    res.json({ message: 'demo data restored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
