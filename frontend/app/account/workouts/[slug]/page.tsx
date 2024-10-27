import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import { Typography } from '@mui/material';

interface CustomProps {
  params: { slug: string };
}

export default function WorkoutPage({ params }: CustomProps) {
  return (
    <>
      <ContentHeaderMenu>
        <Typography variant='h2'>{params.slug}</Typography>
        <ContentHeaderBtn>Add new day</ContentHeaderBtn>
      </ContentHeaderMenu>
      {/* {data.length === 0 ? (
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
          <ContentFooterBtn>Manage days</ContentFooterBtn>
        </>
      )} */}
    </>
  );
}
