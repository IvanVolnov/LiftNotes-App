import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import {
  createExercise,
  editExercise,
  getExercises,
} from '../controller/exercisesController.js';

const exercises = express.Router();

// // get all days of user
exercises.post('/', authenticateToken, getExercises);

// // create new day
exercises.post('/create', authenticateToken, createExercise);

// // edit day
exercises.put('/edit', authenticateToken, editExercise);

// // reorder days
// exercises.put('/reorder', authenticateToken, reorderDay);

// // delete day
// exercises.delete('/delete', authenticateToken, deleteDay);

export default exercises;
