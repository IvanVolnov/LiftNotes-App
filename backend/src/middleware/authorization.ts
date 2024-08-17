import jwt from 'jsonwebtoken';
import { RequestHandler, Request, Response } from 'express';
import { User } from '../controller/authController.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

interface AuthRequest extends Request {
  user?: User;
}

interface AuthResponse extends Response {
  token?: {};
}

export const authenticateToken: RequestHandler = (
  req: AuthRequest,
  res: AuthResponse,
  next
) => {
  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  console.log(`old token: ${token}`);
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      req.user = user as User;
      res.locals.accessToken = jwtTokens(req.user).accessToken;
      next();
    }
  );
};
