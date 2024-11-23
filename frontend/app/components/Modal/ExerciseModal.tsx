import * as React from 'react';
import Button from '@mui/material/Button';
import SubmitButton from '../UI/SubmitButton';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useModalContext } from '@/app/context/ModalContext';

export default function ExerciseModal() {
  const { mode, toggleModal } = useModalContext();

  const [exerciseType, setExerciseType] = React.useState('');
  const [externalLinks, setExternalLinks] = React.useState<ExternalLink[]>([
    { label: '', href: '' },
  ]);
  // const [customButtons, setCustomButtons] = React.useState<ExternalLink[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setExerciseType(event.target.value as string);
  };

  const handleClose = () => {
    toggleModal();
  };

  function handleAddLink() {
    setExternalLinks((prev) => [...prev, { label: '', href: '' }]);
  }

  return (
    <>
      <DialogTitle>
        {`${mode.operation}
        ${mode.entity}`}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin='dense'
          id='name'
          name='name'
          label='Name'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={mode.modeData?.name}
        />
        <TextField
          margin='dense'
          id='description'
          name='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={mode.modeData?.description}
        />
        <FormControl sx={{ width: '10rem', marginTop: '2rem' }}>
          <InputLabel id='exercise-type-select-label'>exercise type</InputLabel>
          <Select
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
          </Select>
        </FormControl>
        <Typography variant='subtitle1' mt={3} mb={2}>
          External links
        </Typography>
        {externalLinks.map((el, i) => {
          return (
            <Stack key={i} direction='row' spacing={1} mb={2}>
              <TextField
                margin='dense'
                id={`label-${i}`}
                name='label'
                label='Label'
                type='text'
                // defaultValue={mode.modeData?.externalLinks[i].label}
              />
              <TextField
                margin='dense'
                id={`href-${i}`}
                name='href'
                label='Link'
                type='text'
                // defaultValue={mode.modeData?.externalLinks[i].label}
              />
            </Stack>
          );
        })}
        <Button onClick={handleAddLink}>Add link</Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
