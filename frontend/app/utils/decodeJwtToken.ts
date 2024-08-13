import { decodeJwt } from 'jose';

export default function decodeJwtToken(token: string | undefined = '') {
  try {
    const payload = decodeJwt(token);
    return payload;
  } catch (error) {
    // throw new Error(`Failed to decode jwt token:${error}`);
    return null;
  }
}
