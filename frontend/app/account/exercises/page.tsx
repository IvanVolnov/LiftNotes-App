import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/Buttons/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/Buttons/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import extractUserId from '@/app/utils/extractUserId';
import { Alert, Typography } from '@mui/material';
import { getData } from '@/app/lib/getData';

export default async function Exercises() {
  const data: Exercise[] = await getData('exercise');

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>All Exercises</Typography>
        <ContentHeaderBtn entity='exercise'>Create exercise</ContentHeaderBtn>
      </ContentHeaderMenu>
      {data.length === 0 ? (
        <Alert variant='outlined' severity='info' sx={{ marginTop: '2rem' }}>
          There are no exercises yet.
        </Alert>
      ) : (
        <>
          <ContentList data={data} mode='exercise' />
          <ContentFooterBtn>Manage exercises</ContentFooterBtn>
        </>
      )}
    </>
  );
}
