import jwt from 'jsonwebtoken';
import { RequestHandler, Request } from 'express';
import { User } from '../controller/authController.js';

interface AuthRequest extends Request {
  user?: User;
}

export const authenticateToken: RequestHandler = (
  req: AuthRequest,
  res,
  next
) => {
  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      req.user = user as User;
      next();
    }
  );
};
