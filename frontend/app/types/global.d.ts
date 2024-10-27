interface Workout {
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
}

interface Exercise {
  exercise_id: string;
  exercise_name: string;
  exercise_description: string;
  position: number;
  created_at: string | Date;
}

interface Content {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  optimistic?: boolean;
}

type Entity = 'workout' | 'day' | 'exercise';
type Operation = 'create' | 'edit' | 'duplicate' | 'delete';

interface LinkHref {
  pathName: string;
  query: {
    name: string;
    description: string;
  };
}
