import * as React from 'react';
import Button from '@mui/material/Button';
import SubmitButton from '../UI/Buttons/SubmitButton';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useModalContext } from '@/app/context/ModalContext';
import DynamicColorBtn from '../UI/Buttons/DynamicColorBtn';

import DynamicColorSelect from '../UI/DynamicColorSelect';
import DynamicColorTextFeild from '../UI/DynamicColorTextFeild';

export default function ExerciseModal() {
  const { mode, toggleModal } = useModalContext();

  const ExerciseData = mode.modeData as ExerciseNormalised;

  const [exerciseType, setExerciseType] = React.useState(
    ExerciseData?.exerciseType || ''
  );

  const emptyLink = {
    label: '',
    href: '',
  };

  const [externalLinks, setExternalLinks] = React.useState<ExternalLink[]>(
    ExerciseData?.exerciseExternalLinks || [emptyLink]
  );

  const handleChange = (event: SelectChangeEvent) => {
    setExerciseType(event.target.value as ExerciseType);
  };

  const handleClose = () => {
    toggleModal();
  };

  function handleAddLink() {
    setExternalLinks((prev) => [...prev, emptyLink]);
  }

  function handleRemoveLink() {
    setExternalLinks((prev) => prev.slice(0, -1));
  }

  return (
    <>
      <DialogTitle>
        {`${mode.operation}
        ${mode.entity}`}
      </DialogTitle>
      <DialogContent>
        <DynamicColorTextFeild
          autoFocus
          required
          margin='dense'
          id='name'
          name='name'
          label='Name'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={ExerciseData?.name}
        />
        <DynamicColorTextFeild
          id='description'
          margin='dense'
          name='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={ExerciseData?.description}
        />
        <FormControl sx={{ width: '10rem', marginTop: '2rem' }}>
          <InputLabel id='exercise-type-select-label'>exercise type</InputLabel>
          <DynamicColorSelect
            labelId='exercise-type-select-label'
            id='exercise-type-select'
            value={exerciseType}
            name='exerciseType'
            label='Exercise type'
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value={'no type'}>no type</MenuItem>
            <MenuItem value={'compound'}>compound</MenuItem>
            <MenuItem value={'cardio'}>cardio</MenuItem>
            <MenuItem value={'isolation'}>isolation</MenuItem>
            <MenuItem value={'stretching'}>stretching</MenuItem>
          </DynamicColorSelect>
        </FormControl>
        <Typography variant='subtitle1' mt={3} mb={2}>
          External links
        </Typography>
        {externalLinks.map((el, i) => {
          const labelIsRequired =
            externalLinks[i].href !== '' && externalLinks[i].label === '';
          return (
            <Stack key={i} direction='row' spacing={1} mb={2}>
              <DynamicColorTextFeild
                error={labelIsRequired}
                required={labelIsRequired}
                id={`label-${i}`}
                name='label'
                label={labelIsRequired ? 'Label is required' : 'Label'}
                type='text'
                variant='standard'
                margin='dense'
                defaultValue={el.label}
                onChange={(e) =>
                  setExternalLinks((prev) =>
                    prev.toSpliced(i, 1, {
                      href: prev[i].href,
                      label: e.target.value,
                    })
                  )
                }
              />
              <DynamicColorTextFeild
                id={`href-${i}`}
                name='href'
                label='Link'
                type='text'
                margin='dense'
                variant='standard'
                defaultValue={el.href}
                onChange={(e) =>
                  setExternalLinks((prev) =>
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
          <DynamicColorBtn onClick={handleAddLink}>Add link</DynamicColorBtn>
          <Button color='error' onClick={handleRemoveLink}>
            Remove link
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <DynamicColorBtn onClick={handleClose}>Cancel</DynamicColorBtn>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
