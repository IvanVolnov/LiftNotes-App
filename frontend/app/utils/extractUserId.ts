import { cookies } from 'next/headers';
import decodeJwtToken from './decodeJwtToken';

export default function extractUserId() {
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const userId = session?.user_id as string;

  if (!userId) {
    throw new Error('Invalid or missing session token.');
  }

  return { userId, cookie };
}
