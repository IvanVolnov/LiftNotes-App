import { decodeJwt } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default function decodeJwtToken(token: string | undefined = '') {
  try {
    const payload = decodeJwt(token);
    return payload;
  } catch (error) {
    // throw new Error(`Failed to decode jwt token:${error}`);
    return null;
  }
}
