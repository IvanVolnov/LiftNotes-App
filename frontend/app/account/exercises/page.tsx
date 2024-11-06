import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import extractUserId from '@/app/utils/extractUserId';
import { Typography } from '@mui/material';

export default function Exercises() {
  const results = [
    {
      session_id: 'dsafdsfgbg543253245',
      result_date: '2024-11-03T13:29:20Z',
      sets: [
        {
          session_id: 'dsafdsfgbg543253245',
          set_id: 'dfdgnfdgnbg543253245',
          set_number: 1,
          reps: 10,
          weight_amount: 15,
          weight_unit: 'kg',
        },
        {
          session_id: 'dsafdsfgbg543253245',
          set_id: 'dsdfgdsfgsdfg5115',
          set_number: 2,
          reps: 9,
          weight_amount: 14,
          weight_unit: 'kg',
        },
        {
          session_id: 'dsafdsfgbg543253245',
          set_id: 'd45272783873215',
          set_number: 3,
          reps: 8,
          weight_amount: 12,
          weight_unit: 'kg',
        },
      ],
    },
    {
      result_id: 'dsafdsfgbg543253245',
      result_date: '2024-11-03T13:29:20.428Z',
      sets: 3,
      reps: [10, 9, 8],
      weight_amount: [15, 14, 12],
      weight_unit: 'kg',
    },
  ];
  const dummyEx = {
    exercise_id: 'ew6515651rgerwg',
    exercise_type: 'compound',
    exercise_name: 'dummy ex',
    exercise_description: 'dummy ex description',
    position: 0,
    created_at: Date.now().toString(),
    exercise_information: 'big dummy more info',
    previuos_training_was_easy: true,
    last_updated: '2024-11-03T13:29:20.428Z',
    results,
  };

  const data = [dummyEx];

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
