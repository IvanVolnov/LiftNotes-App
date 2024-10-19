import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import {
  createWorkout,
  deleteWorkout,
  editWorkout,
  getWorkouts,
  reorderWorkout,
} from '../controller/workoutsController.js';

const workouts = express.Router();

// get all workouts of user
workouts.post('/', authenticateToken, getWorkouts);

// create new workout
workouts.post('/create', authenticateToken, createWorkout);

// copy workout
// workouts.post('/copy', authenticateToken, copyWorkout);

// edit workout
workouts.put('/edit', authenticateToken, editWorkout);

// reorder workouts
workouts.put('/reorder', authenticateToken, reorderWorkout);

// delete workout
workouts.delete('/delete', authenticateToken, deleteWorkout);

export default workouts;
