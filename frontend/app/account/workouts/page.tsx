import { getWorkouts } from '../../lib/workoutsActions';
import { Stack, Typography } from '@mui/material';
import { cookies } from 'next/headers';
import decodeJwtToken from '@/app/utils/decodeJwtToken';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentBlock from '@/app/components/UI/ContentBlock';

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
      {data.length === 0 ? (
        <Typography mt={4} variant='subtitle1'>
          There are no workouts yet
        </Typography>
      ) : (
        <>
          <Stack mt={4} mb={{ xs: 3, sm: 5 }} spacing={2}>
            {data?.map((workout) => (
              <ContentBlock
                key={workout.workout_id}
                id={workout.workout_id}
                header={workout.workout_name}
                text={workout.workout_description}
              />
            ))}
          </Stack>
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
