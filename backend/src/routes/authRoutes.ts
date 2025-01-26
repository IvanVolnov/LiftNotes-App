import express, { Request, Response } from 'express';

import { authenticateToken } from '../middleware/authorization.js';
import { login, register, updateToken } from '../controller/authController.js';

const users = express.Router();

users.post('/register', register);

users.post('/login', login);

users.post('/update_token', authenticateToken, updateToken);

export default users;
