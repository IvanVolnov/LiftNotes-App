import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import { getResults } from '../controller/resultsController.js';
import { createResult } from '../controller/resultsController.js';
import { editResult } from '../controller/resultsController.js';
import { deleteResult } from '../controller/resultsController.js';

const results = express.Router();

// get all results of exercise
results.post('/', authenticateToken, getResults);

// create new Result
results.post('/create', authenticateToken, createResult);

//  edit Result
results.put('/edit', authenticateToken, editResult);

//  delete Result
results.delete('/delete', authenticateToken, deleteResult);

export default results;
