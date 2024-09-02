'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';

type EntityType = 'workout' | 'day';

export async function getWorkouts() {
  const { cookie, userId } = extractUserId();

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

export async function createWorkoutDay(
  formData: FormData,
  etityType: EntityType
) {
  const { cookie, userId } = extractUserId();
  const entityName = formData.get('entityName') as string | null;
  const entityDescription = formData.get('entityDescription') as string | null;

  if (!userId) {
    throw new Error('Invalid or missing session token.');
  }

  const data = await fetchApiData(
    etityType === 'workout'
      ? 'workouts/create'
      : etityType === 'day'
      ? 'days/create'
      : '',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    etityType === 'workout'
      ? { workout_name: entityName, workout_description: entityDescription }
      : etityType === 'day'
      ? { day_name: entityName, day_description: entityDescription }
      : ''
  );
  return data.workouts;
}
