import { decodeJwt } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default function decodeJwtToken(token: RequestCookie) {
  try {
    const payload = decodeJwt(token.value);
    console.log(payload);
    return payload;
  } catch (error) {
    throw new Error(`Invalid token:${error}`);
  }
}
