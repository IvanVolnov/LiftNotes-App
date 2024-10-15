import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

type EntityType = 'workout' | 'day' | 'exercise';

export async function changeContentPosition(entity: EntityType) {
  const { cookie, userId } = extractUserId();

  const data = await fetchApiData(
    entity,
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { user_id: userId }
  );
  return data.workouts;
}
