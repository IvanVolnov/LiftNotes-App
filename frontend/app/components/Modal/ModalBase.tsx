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

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();

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
            const formJson = Object.fromEntries((formData as any).entries());

            console.log(formJson);
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
