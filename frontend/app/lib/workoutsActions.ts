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
  return data.workouts;
}

export async function createWorkout(formData: FormData) {
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const userId = session?.user_id;
  const workoutName = formData.get('workoutName') as string | null;
  const workoutDescription = formData.get('workoutDescription') as
    | string
    | null;

  if (!userId) {
    throw new Error('Invalid or missing session token.');
  }

  const data = await fetchApiData(
    'workouts/create',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { workout_name: workoutName, workout_description: workoutDescription }
  );
  return data.workouts;
}
