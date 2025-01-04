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

export async function editResult(formData: FormData, resultId: string) {
  const { cookie } = extractUserId();
  const { date, resultSets } = extractResultFormData(formData);

  const body = {
    result_date: toPostgresTimestamp(date),
    result_id: resultId,
    result_sets: JSON.stringify(resultSets),
  };

  const data = await fetchApiData(
    'results/edit',
    'put',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    body
  );
  return data.results;
}
