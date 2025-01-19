import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/Buttons/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/Buttons/ContentHeaderBtn';
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
  const data: Exercise[] = await getData('exercise', params.slug);
  const addExData: Exercise[] = await getData('exercise', params.slug, true);
  const { cookie, userId } = extractUserId();

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
        <Typography mt={4} variant='subtitle1'>
          There are no exercises in this workout day yet
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
