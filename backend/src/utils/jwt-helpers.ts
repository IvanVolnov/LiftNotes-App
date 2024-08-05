import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from '../config/config.js';
import { JwtPayload } from 'jsonwebtoken';

export interface jwtTokensPayload extends JwtPayload {
  user_id?: string;
  login?: string;
  email: string;
}

export function jwtTokens({ user_id, login, email }: jwtTokensPayload) {
  const user = { user_id, login, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
  return { accessToken, refreshToken };
}
