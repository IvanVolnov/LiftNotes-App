import { useModalContext } from '@/app/context/ModalContext';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import SubmitButton from '../../UI/SubmitButton';
import parseValue from '@/app/utils/parseValue';
import ErrorMessage from '../../UI/ErrorMessage';

interface CustomProps {
  error: string;
}

export default function CreateResultModal({ error }: CustomProps) {
  const defaultDate = dayjs();
  const { mode, toggleModal } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

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
    // console.log(sets);
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
      const updatedSets = prev.toSpliced(i, 1, {
        ...prev[i],
        setNumber: i,
        [key]: updatedValue,
      });

      const totalSetAmount = updatedSets.reduce(
        (acc, el, i) => acc + el.setAmount,
        0
      );
      updatedSets.forEach((el) => (el.totalSets = totalSetAmount));

      return updatedSets;
    });
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
          return (
            <Stack
              key={i}
              direction='row'
              spacing={1}
              mb={2}
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                sx={{ width: '3rem' }}
                id={`sets-${i}`}
                name='sets'
                label='Sets'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.setAmount}
                onChange={(e) => handleChangeSet(i, e, 'setAmount')}
              />
              <TextField
                sx={{ width: '3rem' }}
                id={`reps-${i}`}
                name='reps'
                label='Reps'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.reps}
                onChange={(e) => handleChangeSet(i, e, 'reps')}
              />
              <TextField
                sx={{ width: '4rem' }}
                id={`weightAmount-${i}`}
                name='weightAmount'
                label='Weight'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.weightAmount}
                onChange={(e) => handleChangeSet(i, e, 'weightAmount')}
              />
              <TextField
                sx={{ width: '5rem' }}
                required={true}
                id={`weightUnit-${i}`}
                name='weightUnit'
                label='Unit'
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
