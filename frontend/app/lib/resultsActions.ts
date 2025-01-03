'use server';
import fetchApiData from '../utils/fetchApiData';
import extractUserId from '../utils/extractUserId';
import { extractResultFormData } from '../utils/extractFormData';
import toPostgresTimestamp from '../utils/toPostgresTimestamp';

export async function createResult(formData: FormData, exerciseId: string) {
  const { cookie } = extractUserId();
  const { date, resultSets } = extractResultFormData(formData);

  const body = {
    result_date: toPostgresTimestamp(date),
    exercise_id: exerciseId,
    result_sets: JSON.stringify(resultSets),
  };

  console.log('body', body);

  const data = await fetchApiData(
    'results/create',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    body
  );
  return data.results;
}
