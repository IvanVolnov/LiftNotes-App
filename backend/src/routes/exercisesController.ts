import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';

const exercises = express.Router();

// // get all days of user
// exercises.post('/', authenticateToken, getDays);

// // create new day
// exercises.post('/create', authenticateToken, createDay);

// // edit day
// exercises.put('/edit', authenticateToken, editDay);

// // reorder days
// exercises.put('/reorder', authenticateToken, reorderDay);

// // delete day
// exercises.delete('/delete', authenticateToken, deleteDay);

export default exercises;
