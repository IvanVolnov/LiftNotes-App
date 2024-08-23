import { getWorkouts } from '../../lib/workoutsActions';
import { Button, Stack, Typography } from '@mui/material';
import { cookies } from 'next/headers';
import decodeJwtToken from '@/app/utils/decodeJwtToken';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';

export interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
}

const test = async () => {
  'use server';
  console.log('click');
};
export default async function Workouts() {
  const data: Workout[] = await getWorkouts();
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const email = session?.email as string;

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: { xs: 'center', sm: 'space-between' },
        }}
        spacing={2}
      >
        <Typography variant='h2'>Workouts</Typography>
        <ContentHeaderBtn clickFunction={test}>
          Add new workout
        </ContentHeaderBtn>
      </Stack>
      <div>
        {data?.map((workout) => (
          <div key={workout.workout_id}>
            <h1>{workout.workout_name}</h1>
            <p>{workout.workout_description}</p>
          </div>
        ))}
      </div>
      <ContentFooterBtn>Manage workouts</ContentFooterBtn>
    </>
  );
}
