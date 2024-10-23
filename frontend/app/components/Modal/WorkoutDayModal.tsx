'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';

export default function WorkoutDayModal() {
  const { mode, toggleModal } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
