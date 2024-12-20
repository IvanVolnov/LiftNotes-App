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
import { useState } from 'react';

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
    setAmount: 0,
  };

  const [sets, setSets] = useState<ResultSet[]>([emptyResultSet]);

  function handleAddSet() {
    setSets((prev) => [...prev, emptyResultSet]);
  }

  function handleRemoveSet() {
    setSets((prev) => prev.slice(0, -1));
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
        />
        <Typography variant='subtitle1' mt={3} mb={2}>
          Training sets
        </Typography>
        {sets.map((el, i) => {
          const dataIsRequired = sets[i].href !== '' && sets[i].label === '';
          return (
            <Stack key={i} direction='row' spacing={1} mb={2}>
              <TextField
                error={dataIsRequired}
                required={dataIsRequired}
                id={`sets-${i}`}
                name='reps'
                label={dataIsRequired ? 'reps is required' : 'Reps'}
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.label}
                onChange={(e) =>
                  setSets((prev) =>
                    prev.toSpliced(i, 1, {
                      href: prev[i].href,
                      label: e.target.value,
                    })
                  )
                }
              />
              <TextField
                error={dataIsRequired}
                required={dataIsRequired}
                id={`reps-${i}`}
                name='reps'
                label={dataIsRequired ? 'reps is required' : 'Reps'}
                type='number'
                variant='standard'
                margin='dense'
                defaultValue={el.label}
                onChange={(e) =>
                  setSets((prev) =>
                    prev.toSpliced(i, 1, {
                      href: prev[i].href,
                      label: e.target.value,
                    })
                  )
                }
              />
              <TextField
                id={`href-${i}`}
                name='href'
                label='Link'
                type='text'
                margin='dense'
                variant='standard'
                defaultValue={el.href}
                onChange={(e) =>
                  setSets((prev) =>
                    prev.toSpliced(i, 1, {
                      label: prev[i].label,
                      href: e.target.value,
                    })
                  )
                }
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
