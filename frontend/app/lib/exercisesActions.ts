'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
import { extractExerciseFormData } from '../utils/extractFormData';

export async function createExercise(formData: FormData, day_id?: string) {
  const { cookie } = extractUserId();
  const { name, description, type, externalLinks } =
    extractExerciseFormData(formData);

  const body = {
    exercise_name: name,
    exercise_description: description,
    exercise_type: type,
    exercise_external_links: JSON.stringify(externalLinks),
    day_id,
  };

  const data = await fetchApiData(
    'exercises/create',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    body
  );
  return data.exercises;
}

export async function editExercise(
  formData: FormData,
  modeData: ExerciseNormalised
) {
  const { cookie } = extractUserId();
  const { name, description, type, externalLinks } =
    extractExerciseFormData(formData);

  const body = {
    exercise_id: modeData.id,
    exercise_name: name,
    exercise_description: description,
    exercise_type: type,
    exercise_external_links: JSON.stringify(externalLinks),
  };

  const data = await fetchApiData(
    'exercises/edit',
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    body
  );

  return data.exercises;
}

export async function deleteExercise(
  modeData: ExerciseNormalised,
  dayId?: string
) {
  const { cookie } = extractUserId();
  let route = 'exercises/delete';

  if (dayId) {
    route = 'days/deleteExercise';
  }

  console.log(modeData, dayId);

  const data = await fetchApiData(
    route,
    'delete',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    {
      exercise_id: modeData.id,
      day_id: dayId,
    }
  );
  return data.exercises;
}

export async function setPrevExercise(id: string, newState: boolean) {
  const { cookie } = extractUserId();
  const data = await fetchApiData(
    'exercises/setPrev',
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    {
      exercise_id: id,
      newState,
    }
  );
  return data.exercises;
}
