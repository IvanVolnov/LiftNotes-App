import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

export async function getData(
  entityType: Entity,
  parentId?: string,
  isAddEx?: boolean
) {
  const { cookie, userId } = extractUserId();
  let route = '',
    body = {};

  if (entityType === 'workout') {
    route = 'workouts';
    body = { user_id: userId };
  }

  if (entityType === 'exercise') {
    route = 'exercises';
    body = {
      user_id: userId,
      ...(parentId ? { day_id: parentId } : {}),
      ...(parentId && isAddEx ? { isAddEx } : {}),
    };
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
