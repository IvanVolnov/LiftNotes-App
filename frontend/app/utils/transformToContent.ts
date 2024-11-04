export default function transformToContent(
  item: Workout | Day | Exercise
): Content {
  if ('workout_name' in item) {
    const { workout_id, workout_name, workout_description, user_id, ...rest } =
      item;
    return {
      ...rest,
      name: workout_name,
      id: workout_id,
      description: workout_description,
      parentId: user_id,
    };
  }
  if ('day_name' in item) {
    const { day_id, day_name, day_description, workout_id, ...rest } = item;
    return {
      ...rest,
      name: day_name,
      id: day_id,
      description: day_description,
      parentId: workout_id,
    };
  }
  if ('exercise_name' in item) {
    const { exercise_id, exercise_name, exercise_description, ...rest } = item;
    return {
      ...item,
      name: exercise_name,
      id: exercise_id,
      description: exercise_description,
    };
  }
  throw new Error('Unknown item type');
}

export function transformToContentArray(
  items: (Workout | Day | Exercise)[]
): Content[] {
  return items.map(transformToContent);
}
