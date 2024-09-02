'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import { useRouter } from 'next/navigation';

// interface CustomProps {
//   isOpened: boolean;
// }

export default function WorkoutDayModal() {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <DialogTitle>Create Workout</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin='dense'
          id='name'
          name='entityName'
          label='Name'
          type='text'
          fullWidth
          variant='standard'
          color='primary'
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          name='entityDescription'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
