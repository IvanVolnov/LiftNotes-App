type ExerciseType = 'compound' | 'cardio' | 'isolation' | 'stretching';

export default function extractFormData(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  return { name, description };
}

export function extractExerciseFormData(formData: FormData) {
  const { name, description } = extractFormData(formData);
  const type = formData.get('exerciseType');

  const externalLinksLabels = formData.getAll('label');
  const externalLinksHrefs = formData.getAll('href');

  const externalLinks = externalLinksLabels.map((label, i) => {
    return { label, href: externalLinksHrefs[i] };
  });

  return { name, description, type, externalLinks };
}

export function extractResultFormData(formData: FormData) {
  const date = formData.get('resultDate') as string;

  const setAmounts = formData.getAll('sets');
  const setReps = formData.getAll('reps');
  const setWeightAmounts = formData.getAll('weightAmount');
  const setWeightUnits = formData.getAll('weightUnit');

  const resultSets = setAmounts.map((setAmount, i) => {
    return {
      setAmount,
      reps: setReps[i],
      weightAmount: setWeightAmounts[i],
      weightUnit: setWeightUnits[i],
    };
  });

  return { date, resultSets };
}
