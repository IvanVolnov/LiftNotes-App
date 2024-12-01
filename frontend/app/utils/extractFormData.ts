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
