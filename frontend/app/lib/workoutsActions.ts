'use server';
import { cookies } from 'next/headers';
import fetchApiData from '../utils/fetchApiData';
import decodeJwtToken from '../utils/decodeJwtToken';

export async function getWorkouts() {
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const userId = session?.user_id;

  if (!userId) {
    throw new Error('Invalid or missing session token.');
  }

  const data = await fetchApiData(
    'workouts',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { user_id: userId }
  );
  // cookies().set('accessToken', data.accessToken);
  return data.workouts;
}

// export interface Workout {
//   workout_id: string;
//   workout_name: string;
//   workout_description: string;
// }

// export async function getWorkouts(): Promise<Workout[]> {
//   const res = await fetch('http://localhost:3000/api/workouts', {
//     method: 'POST',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch workouts');
//   }

//   const workouts: Workout[] = await res.json();
//   return workouts;
// }
