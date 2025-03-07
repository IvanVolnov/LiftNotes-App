type Entity = 'workout' | 'day' | 'exercise' | 'result';
type Operation = 'create' | 'edit' | 'delete' | 'manageList';

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
  resultId: string;
  resultDate: string;
  resultSets: ResultSet[];
}

interface ResultSet {
  setId: string;
  reps: number;
  weightAmount: number;
  weightUnit: string;
  setAmount: number;
  totalSets?: number;
  isFirstSet?: boolean;
  isLastSet?: boolean;
  resultDate?: string;
}

type ExerciseType =
  | 'no type'
  | 'compound'
  | 'cardio'
  | 'isolation'
  | 'stretching';

interface ExternalLink {
  label: string;
  href: string;
}

interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseDescription: string;
  exerciseExternalLinks: ExternalLink[];
  position: number;
  created_at: string | Date;
  exerciseType?: ExerciseType;
  previousTrainingWasEasy: boolean;
  exerciseResults: Result[];
}

interface Content {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  parentId?: string;
  optimistic?: boolean;
}

interface ExerciseNormalised {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  exerciseType: ExerciseType;
  previousTrainingWasEasy: boolean;
  exerciseExternalLinks: ExternalLink[];
  optimistic?: boolean;
  exerciseResults: Result[];
}
