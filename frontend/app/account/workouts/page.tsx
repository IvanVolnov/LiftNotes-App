import { Alert, Typography } from '@mui/material';
import ContentHeaderBtn from '@/app/components/UI/Buttons/ContentHeaderBtn';
import ContentFooterBtn from '@/app/components/UI/Buttons/ContentFooterBtn';
import ContentList from '@/app/components/sortableList/ContentList';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { getData } from '@/app/lib/getData';

export default async function Workouts() {
  const data: Workout[] = await getData('workout');

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>Workouts</Typography>
        <ContentHeaderBtn entity='workout'>Create workout</ContentHeaderBtn>
      </ContentHeaderMenu>
      {data.length === 0 ? (
        <Alert variant='outlined' severity='info' sx={{ marginTop: '2rem' }}>
          There are no workouts yet.
        </Alert>
      ) : (
        <>
          <ContentList data={data} mode='workout' />
          <ContentFooterBtn>Manage workouts</ContentFooterBtn>
        </>
      )}
    </>
  );
}
