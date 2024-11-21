'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/app/lib/getData';
import { Mode } from '@/app/context/ModalContext';

interface CustomProps {
  mode: Mode;
}

interface Workout {
  workout_id: string;
  workout_description: string;
}

export default function ExerciseSecondStep({ mode }: CustomProps) {
  const [workoutsList, setWorkoutsList] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const fetchedData = await getData(
          'workout',
          undefined,
          mode.userId,
          mode.cookie
        );
        setWorkoutsList(fetchedData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [mode]);

  if (loading) return <div>Loading...</div>;
  if (!workoutsList.length) return <div>No workouts available</div>;
  console.log(workoutsList);

  return (
    <ul>
      {workoutsList.map((el) => (
        <li key={el.workout_id}>{el.workout_description}</li>
      ))}
    </ul>
  );
}
