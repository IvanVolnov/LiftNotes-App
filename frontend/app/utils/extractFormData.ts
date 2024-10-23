export default function extractFormData(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  return { name, description };
}
