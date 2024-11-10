interface Workout {
  user_id: string;
  workout_id: string;
  workout_name: string;
  workout_description: string;
  position: number;
  created_at: string | Date;
}

interface Day {
  day_id: string;
  day_name: string;
  day_description: string;
  position: number;
  created_at: string | Date;
  workout_id: string;
}

interface Result {
  result_id: string;
  result_date: string;
  sets: Set[];
}

interface Set {
  result_id: string;
  set_id: string;
  set_number: number;
  reps: number;
  weight_amount: number;
  weight_unit: string;
}

interface Exercise {
  exercise_id: string;
  exercise_name: string;
  exercise_description: string;
  position: number;
  created_at: string | Date;
  exercise_type?: 'compound' | 'cardio' | 'isolation' | 'stretching';

  previous_training_was_easy: boolean;
  exercise_last_updated: string;
  exercise_results: Result[];
}

interface Content {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  parentId?: string;
  optimistic?: boolean;
  exerciseType?: 'compound' | 'cardio' | 'isolation' | 'stretching';
  exerciseInformation?: string;
  previousTrainingWasEasy?: boolean;
  exerciseLastUpdated?: string;
  exerciseResults?: Result[];
}

interface ExerciseNormalised {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  parentId?: string;
  optimistic?: boolean;
  exerciseType: 'compound' | 'cardio' | 'isolation' | 'stretching';

  previousTrainingWasEasy: boolean;
  exerciseLastUpdated: string;
  exerciseResults: Result[];
}

type Entity = 'workout' | 'day' | 'exercise';
type Operation = 'create' | 'edit' | 'duplicate' | 'delete';
