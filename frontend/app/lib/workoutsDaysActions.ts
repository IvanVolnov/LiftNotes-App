'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
// import { ModeData } from '../context/ModalContext';
import extractFormData from '../utils/extractFormData';

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
  return data.workouts;
}

export async function createWorkoutDay(formData: FormData, etityType: Entity) {
  const { cookie, userId } = extractUserId();
  const { name, description } = extractFormData(formData);

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
      ? { workout_name: name, workout_description: description }
      : etityType === 'day'
      ? { day_name: name, day_description: description }
      : ''
  );
  return data.workouts;
}

export async function editWorkoutDay(
  formData: FormData,
  entityType: Entity,
  modeData: Content
) {
  const { cookie, userId } = extractUserId();
  const { name, description } = extractFormData(formData);

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
          workout_name: name,
          workout_description: description,
          workout_id: modeData.id,
        }
      : entityType === 'day'
      ? {
          day_name: name,
          day_description: description,
          day_id: modeData.id,
        }
      : ''
  );
  return data.workouts;
}

export async function deleteWorkoutDay(entityType: Entity, modeData: Content) {
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
