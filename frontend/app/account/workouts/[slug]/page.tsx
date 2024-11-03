import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { getData } from '@/app/lib/getData';
import extractUserId from '@/app/utils/extractUserId';
import { Typography } from '@mui/material';

interface CustomProps {
  params: { slug: string };
  searchParams: { name: string; description?: string };
}

export default async function WorkoutPage({
  params,
  searchParams,
}: CustomProps) {
  const data: Day[] = await getData('day', params.slug);

  const { cookie, userId } = extractUserId();

  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>{searchParams.name}</Typography>
        <ContentHeaderBtn>Add new day</ContentHeaderBtn>
      </ContentHeaderMenu>
      <Typography mt={2} variant='body1'>
        {searchParams.description}
      </Typography>
      {data.length === 0 ? (
        <Typography mt={4} variant='subtitle1'>
          There are no days in this workout yet
        </Typography>
      ) : (
        <>
          <ContentList data={data} cookie={cookie} mode='day' />
          <ContentFooterBtn>Manage days</ContentFooterBtn>
        </>
      )}
    </>
  );
}
