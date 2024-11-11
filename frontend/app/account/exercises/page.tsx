import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import extractUserId from '@/app/utils/extractUserId';
import { Typography } from '@mui/material';
import dummyData from './dymmyData';

export default function Exercises() {
  const data = dummyData;

  const { cookie, userId } = extractUserId();

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>All Exercises</Typography>
        <ContentHeaderBtn entity='exercise'>Add new exercise</ContentHeaderBtn>
      </ContentHeaderMenu>
      {data.length === 0 ? (
        <Typography mt={4} variant='subtitle1'>
          There are no exercises yet
        </Typography>
      ) : (
        <>
          <ContentList data={data} cookie={cookie} mode='exercise' />
          <ContentFooterBtn>Manage exercises</ContentFooterBtn>
        </>
      )}
    </>
  );
}
