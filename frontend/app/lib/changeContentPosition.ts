'use server';
import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

interface positionsObj {
  id: string;
  position: number;
}

export async function changeContentPosition(
  updatedPositions: positionsObj[],
  entity: Entity,
  dayId?: string
) {
  const { cookie } = extractUserId();
  const data = await fetchApiData(
    `${entity}s/reorder`,
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { newPositions: updatedPositions, dayId }
  );
  return data.workouts;
}
