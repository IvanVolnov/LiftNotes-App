import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

export async function getData(entityType: Entity, workoutId?: string) {
  const { cookie, userId } = extractUserId();

  let route = '',
    body = {};

  if (entityType === 'workout') {
    route = 'workouts';
    body = { user_id: userId };
  }

  if (entityType === 'day') {
    route = 'days';
    body = { workout_id: workoutId };
  }

  const data = await fetchApiData(
    route,
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    body
  );
  return data.result;
}
