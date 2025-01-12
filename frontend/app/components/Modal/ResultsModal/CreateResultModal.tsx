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
import SubmitButton from '../../UI/Buttons/SubmitButton';
import parseValue from '@/app/utils/parseValue';
import ErrorMessage from '../../UI/ErrorMessage';
import { useModalContext } from '@/app/context/ModalContext';
import DynamicColorBtn from '../../UI/Buttons/DynamicColorBtn';
import DynamicColorTextFeild from '../../UI/DynamicColorTextfeild';
import { useColorModeContext } from '@/app/context/ColorModeContext';

interface CustomProps {
  error: string;
  handleClose: () => void;
}

export default function CreateResultModal({ error, handleClose }: CustomProps) {
  const { mode } = useModalContext();
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  const defaultDate = mode.resultData?.resultDate
    ? dayjs(mode.resultData.resultDate)
    : dayjs();

  const emptyResultSet: ResultSet = {
    setId: '',
    // setNumber: 0,
    reps: 0,
    weightAmount: 0,
    weightUnit:
      (mode.modeData as ExerciseNormalised)?.exerciseResults[0]?.resultSets[0]
        ?.weightUnit || '',
    // totalSets: 0,
    setAmount: 1,
  };

  const [sets, setSets] = useState<ResultSet[]>(
    mode.resultData ? mode.resultData.resultSets : [emptyResultSet]
  );

  function handleAddSet() {
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
        [key]: updatedValue,
      });
      return updatedSets;
    });
  }

  return (
    <>
      <DialogTitle>add training result</DialogTitle>
      <DialogContent>
        <DatePicker
          label='Result date'
          name='resultDate'
          disableFuture={true}
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
              sx={{ flexWrap: 'nowrap' }}
            >
              <DynamicColorTextFeild
                sx={{ flex: '2 2' }}
                id={`sets-${i}`}
                name='sets'
                label='Sets'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.setAmount}
                onChange={(e) => handleChangeSet(i, e, 'setAmount')}
              />
              <DynamicColorTextFeild
                sx={{ flex: '3 3' }}
                id={`reps-${i}`}
                name='reps'
                label='Reps'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.reps}
                onChange={(e) => handleChangeSet(i, e, 'reps')}
              />
              <DynamicColorTextFeild
                sx={{ flex: '4 4' }}
                id={`weightAmount-${i}`}
                name='weightAmount'
                label='Weight'
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.weightAmount}
                onChange={(e) => handleChangeSet(i, e, 'weightAmount')}
              />
              <DynamicColorTextFeild
                sx={{ flex: '6 6' }}
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
          <DynamicColorBtn onClick={handleAddSet}>Add set</DynamicColorBtn>
          <Button color='error' onClick={handleRemoveSet}>
            Remove set
          </Button>
        </Stack>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <DynamicColorBtn onClick={handleClose}>Cancel</DynamicColorBtn>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
