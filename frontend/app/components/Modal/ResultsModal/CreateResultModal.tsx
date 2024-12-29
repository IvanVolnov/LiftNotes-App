import { useModalContext } from '@/app/context/ModalContext';
import {
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';

interface CustomProps {}

export default function CreateResultModal({}: CustomProps) {
  const { mode } = useModalContext();
  const defaultDate = dayjs();

  const emptyResultSet: ResultSet = {
    setId: '',
    setNumber: 0,
    reps: 0,
    weightAmount: 0,
    weightUnit: '',
    totalSets: 0,
    setAmount: 1,
  };

  const [sets, setSets] = useState<ResultSet[]>([emptyResultSet]);

  function handleAddSet() {
    console.log(sets);
    setSets((prev) => [...prev, emptyResultSet]);
  }

  function handleRemoveSet() {
    setSets((prev) => prev.slice(0, -1));
  }

  function handleChangeSet(
    i: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ResultSet
  ) {
    setSets((prev) => {
      const updatedValue = parseValue(key, e.target.value);

      return prev.toSpliced(i, 1, {
        ...prev[i],
        [key]: updatedValue,
      });
    });
  }

  function parseValue(key: keyof ResultSet, val: string) {
    const numericFields: (keyof ResultSet)[] = [
      'setNumber',
      'reps',
      'weightAmount',
      'totalSets',
      'setAmount',
    ];

    if (numericFields.includes(key)) {
      return Number(val);
    }
    return val;
  }

  return (
    <>
      <DialogTitle>Update training result</DialogTitle>
      <DialogContent>
        <DatePicker
          label='Result date'
          name='resultDate'
          autoFocus={true}
          defaultValue={defaultDate}
          sx={{ marginTop: '1rem' }}
        />
        <Typography variant='subtitle1' mt={3} mb={2}>
          Training sets
        </Typography>
        {sets.map((el, i) => {
          const invalidData = false;
          return (
            <Stack
              key={i}
              direction='row'
              spacing={1}
              mb={2}
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                sx={{ width: '4rem' }}
                error={invalidData}
                required={invalidData}
                id={`sets-${i}`}
                name='reps'
                label={invalidData ? 'invalid data' : 'Sets'}
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.setAmount}
                onChange={(e) => handleChangeSet(i, e, 'setAmount')}
              />
              <TextField
                sx={{ width: '4rem' }}
                error={invalidData}
                required={invalidData}
                id={`reps-${i}`}
                name='reps'
                label={invalidData ? 'invalid data' : 'Reps'}
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.reps}
                onChange={(e) => handleChangeSet(i, e, 'reps')}
              />
              <TextField
                sx={{ width: '4rem' }}
                error={invalidData}
                required={invalidData}
                id={`weightAmount-${i}`}
                name='weightAmount'
                label={invalidData ? 'invalid data' : 'Weight'}
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.weightAmount}
                onChange={(e) => handleChangeSet(i, e, 'weightAmount')}
              />
              <TextField
                error={invalidData}
                required={invalidData}
                id={`weightUnit-${i}`}
                name='weightUnit'
                label={invalidData ? 'invalid data' : 'Unit'}
                variant='standard'
                margin='dense'
                defaultValue={el.weightUnit}
                onChange={(e) => handleChangeSet(i, e, 'weightUnit')}
              />
            </Stack>
          );
        })}

        <Stack direction='row' spacing={1} mb={2}>
          <Button onClick={handleAddSet}>Add set</Button>
          <Button color='error' onClick={handleRemoveSet}>
            Remove set
          </Button>
        </Stack>
      </DialogContent>
    </>
  );
}
