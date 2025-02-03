import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/Buttons/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/Buttons/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { getData } from '@/app/lib/getData';
import { Alert, Typography } from '@mui/material';

interface CustomProps {
  params: { slug: string };
  searchParams: { name: string; description?: string };
}

export default async function WorkoutPage({
  params,
  searchParams,
}: CustomProps) {
  const data: Day[] = await getData('day', params.slug);

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>{searchParams.name}</Typography>
        <ContentHeaderBtn entity='day'>Add new day</ContentHeaderBtn>
      </ContentHeaderMenu>
      <Typography mt={2} variant='body1'>
        {searchParams.description}
      </Typography>
      {data.length === 0 ? (
        <Alert variant='outlined' severity='info' sx={{ marginTop: '2rem' }}>
          There are no days in this workout yet.
        </Alert>
      ) : (
        <>
          <ContentList data={data} mode='day' />
          <ContentFooterBtn>Manage days</ContentFooterBtn>
        </>
      )}
    </>
  );
}
