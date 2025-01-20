'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
import extractFormData from '../utils/extractFormData';

export async function createWorkoutDay(
  formData: FormData,
  etityType: Entity,
  parentId?: string
) {
  const { cookie, userId } = extractUserId();
  const { name, description } = extractFormData(formData);

  let route = '',
    body = {};

  if (etityType === 'workout') {
    route = 'workouts/create';
    body = { workout_name: name, workout_description: description };
  }

  if (etityType === 'day') {
    route = 'days/create';
    body = {
      day_name: name,
      day_description: description,
      workout_id: parentId,
    };
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
  const { cookie } = extractUserId();

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

export async function addExerciseToDay(exercises: string[], dayId: string) {
  const { cookie } = extractUserId();

  const data = await fetchApiData(
    'days/addExercise',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { exercises, dayId }
  );
  return data.addedExercises;
}
