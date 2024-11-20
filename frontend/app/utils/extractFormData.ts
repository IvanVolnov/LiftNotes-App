type ExerciseType = 'compound' | 'cardio' | 'isolation' | 'stretching';

export default function extractFormData(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as ExerciseType;

  return { name, description, type };
}
