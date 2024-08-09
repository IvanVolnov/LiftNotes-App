import { getWorkouts } from '../../lib/workoutsActions';
import decodeJwtToken from '@/app/utils/decodeJwtToken';
import { Container } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
}

export default async function Workouts() {
  const data: Workout[] = await getWorkouts();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <h1>Logged in!</h1>

      <div>
        {data?.map((workout) => (
          <div key={workout.workout_id}>
            <h1>{workout.workout_name}</h1>
            <p>{workout.workout_description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
