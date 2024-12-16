import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import {
  createExercise,
  deleteExercise,
  editExercise,
  getExercises,
  reorderExercise,
  setPrevExercise,
} from '../controller/exercisesController.js';

const exercises = express.Router();

// get all exercises of user
exercises.post('/', authenticateToken, getExercises);

// create new Exercise
exercises.post('/create', authenticateToken, createExercise);

//  edit Exercise
exercises.put('/edit', authenticateToken, editExercise);

//  reorder exercises
exercises.put('/reorder', authenticateToken, reorderExercise);

//  delete Exercise
exercises.delete('/delete', authenticateToken, deleteExercise);

//  set Prev Exercise
exercises.put('/setPrev', authenticateToken, setPrevExercise);

export default exercises;
