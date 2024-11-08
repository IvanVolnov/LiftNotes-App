import ContentList from '@/app/components/sortableList/ContentList';
import ContentFooterBtn from '@/app/components/UI/ContentFooterBtn';
import ContentHeaderBtn from '@/app/components/UI/ContentHeaderBtn';
import ContentHeaderMenu from '@/app/components/UI/ContentHeaderMenu';
import extractUserId from '@/app/utils/extractUserId';
import { Typography } from '@mui/material';

export default function Exercises() {
  const exercise_results = [
    {
      result_id: 'dsafdsfgbg543253245',
      result_date: '2024-11-03T13:29:20Z',
      sets: [
        {
          result_id: 'dsafdsfgbg543253245',
          set_id: 'dfdgnfdgnbg543253245',
          set_number: 1,
          reps: 10,
          weight_amount: 15,
          weight_unit: 'kg',
        },
        {
          result_id: 'dsafdsfgbg543253245',
          set_id: 'dsdfgdsfgsdfg5115',
          set_number: 2,
          reps: 9,
          weight_amount: 14,
          weight_unit: 'kg',
        },
        {
          result_id: 'dsafdsfgbg543253245',
          set_id: 'd45272783873215',
          set_number: 3,
          reps: 8,
          weight_amount: 12,
          weight_unit: 'kg',
        },
      ],
    },
    {
      result_id: 'abc123xyz456789101',
      result_date: '2024-11-04T10:15:00Z',
      sets: [
        {
          result_id: 'abc123xyz456789101',
          set_id: 'set789101112131415',
          set_number: 1,
          reps: 12,
          weight_amount: 20,
          weight_unit: 'kg',
        },
        {
          result_id: 'abc123xyz456789101',
          set_id: 'set789101112131416',
          set_number: 2,
          reps: 10,
          weight_amount: 18,
          weight_unit: 'kg',
        },
        {
          result_id: 'abc123xyz456789101',
          set_id: 'set789101112131417',
          set_number: 3,
          reps: 8,
          weight_amount: 16,
          weight_unit: 'kg',
        },
      ],
    },
    {
      result_id: 'fgh987tuv654321908',
      result_date: '2024-11-05T15:40:00Z',
      sets: [
        {
          result_id: 'fgh987tuv654321908',
          set_id: 'set654321908111213',
          set_number: 1,
          reps: 11,
          weight_amount: 17,
          weight_unit: 'kg',
        },
        {
          result_id: 'fgh987tuv654321908',
          set_id: 'set654321908111214',
          set_number: 2,
          reps: 9,
          weight_amount: 15,
          weight_unit: 'kg',
        },
        {
          result_id: 'fgh987tuv654321908',
          set_id: 'set654321908111215',
          set_number: 3,
          reps: 7,
          weight_amount: 13,
          weight_unit: 'kg',
        },
      ],
    },
  ];

  const dummyEx: Exercise = {
    exercise_id: 'ew6515651rgerwg',
    exercise_type: 'compound',
    exercise_name: 'dummy ex',
    exercise_description: 'dummy ex description',
    position: 0,
    created_at: Date.now().toString(),
    exercise_information: 'big dummy more info',
    previous_training_was_easy: true,
    exercise_last_updated: '2024-11-03T13:29:20.428Z',
    exercise_results,
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
