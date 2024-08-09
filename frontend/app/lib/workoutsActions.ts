import { cookies } from 'next/headers';
import fetchApiData from '../utils/fetchApiData';
import decodeJwtToken from '../utils/decodeJwtToken';

export async function getWorkouts() {
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  // const session = decodeJwt(cookie);
  const userId = session?.user_id;

  if (!userId) {
    throw new Error('Invalid or missing session token.');
  }

  //   try {
  //     const response = await fetch(`${process.env.APP_API_URL}/api/workouts`, {
  //       method: 'POST',
  //       cache: 'no-cache',
  //       headers: new Headers({
  //         Authorization: `Bearer ${accessToken?.value}`,
  //         'Content-Type': 'application/json',
  //       }),
  //       body: JSON.stringify({ user_id }),
  //     });

  //     if (!response.ok) {
  //       if (!response.ok) {
  //         throw new Error(`Error fetching data: ${response.statusText}`);
  //       }
  //     }

  //     const contentType = response.headers.get('content-type');
  //     if (!contentType || !contentType.includes('application/json')) {
  //       console.error('Expected JSON response but got:', contentType);
  //       const text = await response.text();
  //       throw new Error(`Response body:, ${text}`);
  //     }

  //     const data = await response.json();

  const data = await fetchApiData(
    'workouts',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { userId }
  );
  return data.workouts;
}
