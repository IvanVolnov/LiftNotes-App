import { decodeJwt } from 'jose';

export default function decodeJwtToken(token: string) {
  try {
    const { payload } = decodeJwt(token);
    return payload;
  } catch (error) {
    throw new Error(`Invalid token:${error}`);
  }
}
