'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
import extractFormData, {
  extractExerciseFormData,
} from '../utils/extractFormData';

export async function createExercise(formData: FormData, parentId?: string) {
  const { cookie } = extractUserId();
  const { name, description, type, externalLinks } =
    extractExerciseFormData(formData);

  const body = {
    exercise_name: name,
    exercise_description: description,
    exercise_type: type,
    exercise_external_links: JSON.stringify(externalLinks),
  };

  console.log(body);

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
  entityType: Entity,
  modeData: Content
) {
  const { cookie, userId } = extractUserId();
  const { name, description } = extractFormData(formData);

  const body = {};

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

// export async function deleteExercise(entityType: Entity, modeData: Content) {
//   const { cookie, userId } = extractUserId();

//   const data = await fetchApiData(
//     entityType === 'workout'
//       ? 'workouts/delete'
//       : entityType === 'day'
//       ? 'days/delete'
//       : '',
//     'delete',
//     {
//       Authorization: `Bearer ${cookie}`,
//       'Content-Type': 'application/json',
//     },
//     entityType === 'workout'
//       ? {
//           workout_id: modeData.id,
//         }
//       : entityType === 'day'
//       ? {
//           day_id: modeData.id,
//         }
//       : ''
//   );
//   return data.workouts;
// }
