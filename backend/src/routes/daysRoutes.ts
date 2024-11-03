import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import {
  createDay,
  deleteDay,
  editDay,
  getDays,
  reorderDay,
} from '../controller/daysController.js';

const days = express.Router();

// get all days of user
days.post('/', authenticateToken, getDays);

// create new day
days.post('/create', authenticateToken, createDay);

// edit day
days.put('/edit', authenticateToken, editDay);

// reorder days
days.put('/reorder', authenticateToken, reorderDay);

// delete day
days.delete('/delete', authenticateToken, deleteDay);

export default days;
