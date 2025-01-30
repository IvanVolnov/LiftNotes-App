import { Request, Response } from 'express';
import pool from '../db/db.js';

export async function restoreData(req: Request, res: Response) {
  try {
    const demoUserId = '12570d37-d9d3-464e-9c08-f4aa27472abb';

    res.json({ message: 'demo data restored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
