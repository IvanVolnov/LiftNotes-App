import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import { authenticateToken } from '../middleware/authorization.js';
import {
  createWorkout,
  getWorkouts,
} from '../controller/workoutsController.js';

const workouts = express.Router();

// get all workouts of user
workouts.post('/', authenticateToken, getWorkouts);

// create new workout
workouts.post('/create', authenticateToken, createWorkout);

// copy workout
// workouts.post('/copy', authenticateToken, copyWorkout);

// edit workout
// workouts.patch('/edit', authenticateToken, editWorkout);

// delete workout
// workouts.patch('/delete', authenticateToken, deleteWorkout);

export default workouts;
