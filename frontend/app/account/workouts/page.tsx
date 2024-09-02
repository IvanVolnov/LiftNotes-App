import { getWorkouts } from '../../lib/workoutsDaysActions';
import { Stack, Typography } from '@mui/material';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentBlock from '../../components/ContentBlock';

export interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
}

export default async function Workouts() {
  const data: Workout[] = await getWorkouts();

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
        <ContentHeaderBtn>Add new workout</ContentHeaderBtn>
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
                mode='workout'
              />
            ))}
          </Stack>
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
