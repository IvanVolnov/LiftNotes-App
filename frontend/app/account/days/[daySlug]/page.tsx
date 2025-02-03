import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/Buttons/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/Buttons/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { getData } from '@/app/lib/getData';
import { Alert, Typography } from '@mui/material';

interface CustomProps {
  params: { daySlug: string };
  searchParams: { name: string; description?: string };
}

export default async function WorkoutPage({
  params,
  searchParams,
}: CustomProps) {
  const data: Exercise[] = await getData('exercise', params.daySlug);
  const addExData: Exercise[] = await getData('exercise', params.daySlug, true);

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>{searchParams.name}</Typography>
        <ContentHeaderBtn
          entity='exercise'
          operation='manageList'
          exercisesList={addExData}
        >
          Add exercise
        </ContentHeaderBtn>
      </ContentHeaderMenu>
      <Typography mt={2} variant='body1'>
        {searchParams.description}
      </Typography>
      {data.length === 0 ? (
        <Alert variant='outlined' severity='info' sx={{ marginTop: '2rem' }}>
          There are no exercises in this workout day yet
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
