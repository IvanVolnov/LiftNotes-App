'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import { Paper } from '@mui/material';
import { createWorkout } from '@/app/lib/workoutsActions';
import { revalidatePath } from 'next/cache';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            createWorkout(formData);
            startTransition(() => {
              // Refresh the current route and fetch new data from the server without
              // losing client-side browser or React state.
              router.refresh();
            });
            handleClose();
          },
        }}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{ bgcolor: 'contentBg.main', filter: 'none' }}
          />
        )}
      >
        <DialogTitle>Create Workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='workoutName'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            color='secondary'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='description'
            name='workoutDescription'
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
      </Dialog>
    </>
  );
}
