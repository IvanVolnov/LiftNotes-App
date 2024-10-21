import { getWorkouts } from '../../lib/workoutsDaysActions';
import { Stack, Typography } from '@mui/material';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentList from '@/app/components/sortableList/ContentList';
import extractUserId from '@/app/utils/extractUserId';
import { revalidatePath, unstable_noStore } from 'next/cache';

export interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
  position: number;
  created_at: string | Date;
}

export default async function Workouts() {
  const data: Workout[] = await getWorkouts();
  console.log(data);
  const { cookie, userId } = extractUserId();

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
          <ContentList data={data} cookie={cookie} userId={userId} />
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
