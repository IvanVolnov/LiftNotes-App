export default function transformToContent(
  item: Workout | Day | Exercise
): Content {
  if ('workout_id' in item) {
    return {
      ...item,
      id: item.workout_id,
      name: item.workout_name,
      description: item.workout_description,
    };
  } else if ('day_id' in item) {
    return {
      ...item,
      id: item.day_id,
      name: item.day_name,
      description: item.day_description,
    };
  } else if ('exercise_id' in item) {
    return {
      ...item,
      id: item.exercise_id,
      name: item.exercise_name,
      description: item.exercise_description,
    };
  }
  throw new Error('Unknown item type');
}

export function transformToContentArray(
  items: (Workout | Day | Exercise)[]
): Content[] {
  return items.map(transformToContent);
}
