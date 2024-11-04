'use server';
import fetchApiData from '../utils/fetchApiData';

interface positionsObj {
  id: string;
  position: number;
}

export async function changeContentPosition(
  updatedPositions: positionsObj[],
  cookie: string,
  entity: Entity
) {
  const data = await fetchApiData(
    `${entity}s/reorder`,
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { newPositions: updatedPositions }
  );
  return data.workouts;
}
