import express from 'express';
import { reset } from '../controller/resetDemoDataController.js';

const demo = express.Router();

demo.post('/reset', reset);

export default demo;
