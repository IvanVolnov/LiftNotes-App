'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
import { ModeData } from '../context/ModalContext';
import { revalidatePath } from 'next/cache';

type EntityType = 'workout' | 'day';

function extractFormData(formData: FormData) {
  const entityName = formData.get('entityName') as string | null;
  const entityDescription = formData.get('entityDescription') as string | null;
  return { entityName, entityDescription };
}

export async function getWorkouts() {
  const { cookie, userId } = extractUserId();

  const data = await fetchApiData(
    'workouts',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { user_id: userId }
  );
  console.log('getWorkouts finished', data.workouts);
  return data.workouts;
}

export async function createWorkoutDay(
  formData: FormData,
  etityType: EntityType
) {
  const { cookie, userId } = extractUserId();
  const { entityName, entityDescription } = extractFormData(formData);

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

export async function editWorkoutDay(
  formData: FormData,
  entityType: EntityType,
  modeData: ModeData
) {
  const { cookie, userId } = extractUserId();
  const { entityName, entityDescription } = extractFormData(formData);
  console.log(modeData);

  const data = await fetchApiData(
    entityType === 'workout'
      ? 'workouts/edit'
      : entityType === 'day'
      ? 'days/edit'
      : '',
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    entityType === 'workout'
      ? {
          workout_name: entityName,
          workout_description: entityDescription,
          workout_id: modeData.id,
        }
      : entityType === 'day'
      ? {
          day_name: entityName,
          day_description: entityDescription,
          day_id: modeData.id,
        }
      : ''
  );
  return data.workouts;
}

export async function deleteWorkoutDay(
  entityType: EntityType,
  modeData: ModeData
) {
  const { cookie, userId } = extractUserId();

  const data = await fetchApiData(
    entityType === 'workout'
      ? 'workouts/delete'
      : entityType === 'day'
      ? 'days/delete'
      : '',
    'delete',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    entityType === 'workout'
      ? {
          workout_id: modeData.id,
        }
      : entityType === 'day'
      ? {
          day_id: modeData.id,
        }
      : ''
  );
  return data.workouts;
}
