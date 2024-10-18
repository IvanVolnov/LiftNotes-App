import extractUserId from '../utils/extractUserId';
import fetchApiData from '../utils/fetchApiData';

interface positionsObj {
  id: string;
  position: number;
}

export async function changeContentPosition(updatedPositions: positionsObj[]) {
  const { cookie, userId } = extractUserId();

  const data = await fetchApiData(
    'workouts/reorder',
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { newPositions: updatedPositions }
  );
  return data.workouts;
}
