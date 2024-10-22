import { getWorkouts } from '../../lib/workoutsDaysActions';
import { Stack, Typography } from '@mui/material';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentList from '@/app/components/sortableList/ContentList';
import extractUserId from '@/app/utils/extractUserId';

export default async function Workouts() {
  const data: Workout[] = await getWorkouts();

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
          <ContentList
            data={data}
            cookie={cookie}
            userId={userId}
            mode='workout'
          />
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
