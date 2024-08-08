import express, { Request, Response } from 'express';
import { sql } from '@vercel/postgres';
import { authenticateToken } from '../middleware/authorization.js';
import getWorkouts from '../controller/workoutsController.js';

const workouts = express.Router();

workouts.post('/', authenticateToken, getWorkouts);

// create new workout

// copy workout

// edit workout

// delete workout

export default workouts;
