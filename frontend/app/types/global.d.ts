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
  sets: ResultSet[];
}

interface ResultSet {
  resultId: string;
  setId: string;
  setNumber: number;
  reps: number;
  weightAmount: number;
  weightUnit: string;
  totalSets?: number;
  setAmount?: number;
  isFirstSet?: boolean;
  isLastSet?: boolean;
  resultDate?: string;
}

interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseDescription: string;
  position: number;
  created_at: string | Date;
  exerciseType?: 'compound' | 'cardio' | 'isolation' | 'stretching';
  previousTrainingWasEasy: boolean;
  exerciseLastUpdated: string;
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
