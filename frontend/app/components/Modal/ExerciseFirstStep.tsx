import { Mode } from '@/app/context/ModalContext';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

interface CustomProps {
  mode: Mode;
}

export default function ExerciseFirstStep({ mode }: CustomProps) {
  return (
    <>
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
        color='primary'
        defaultValue={mode.modeData?.name}
      />
      <TextField
        autoFocus
        margin='dense'
        id='description'
        name='description'
        label='Description'
        type='text'
        fullWidth
        variant='standard'
        defaultValue={mode.modeData?.description}
      />

      <Typography variant='subtitle1' mt={2}>
        Choose exercise type
      </Typography>
      <RadioGroup aria-labelledby='radio-buttons-group-label' name='type'>
        <FormControlLabel
          value={undefined}
          control={<Radio />}
          label='no type'
        />
        <FormControlLabel
          value='compound'
          control={<Radio />}
          label='compound'
        />
        <FormControlLabel value='cardio' control={<Radio />} label='cardio' />
        <FormControlLabel
          value='isolation'
          control={<Radio />}
          label='isolation'
        />
        <FormControlLabel
          value='stretching'
          control={<Radio />}
          label='stretching'
        />
      </RadioGroup>
    </>
  );
}
