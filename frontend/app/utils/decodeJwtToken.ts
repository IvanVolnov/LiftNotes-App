import { JWTPayload, decodeJwt } from 'jose';

interface MyJWTPayload extends JWTPayload {
  email?: string;
  id?: string;
}

export default function decodeJwtToken(token: string): MyJWTPayload | null {
  try {
    const payload = decodeJwt(token) as MyJWTPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
