import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

export async function getData(entityType: Entity, parentId?: string) {
  const { cookie, userId } = extractUserId();
  let route = '',
    body = {};

  if (entityType === 'workout') {
    route = 'workouts';
    body = { user_id: userId };
  }

  if (entityType === 'exercise') {
    route = 'exercises';
    if (parentId) {
      body = { user_id: userId, day_id: parentId };
      console.log(body);
    }

    if (!parentId) {
      body = { user_id: userId };
    }
  }

  if (entityType === 'day') {
    route = 'days';
    body = { workout_id: parentId };
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

export async function getResults(exerciseId: string) {
  const { cookie } = extractUserId();

  const data = await fetchApiData(
    'results',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { exerciseId }
  );
  return data.result;
}
