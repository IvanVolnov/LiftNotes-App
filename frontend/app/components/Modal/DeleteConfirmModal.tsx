'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import { DialogContentText } from '@mui/material';

export default function DeleteConfirmModal() {
  const { mode, toggleModal } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <DialogTitle>Delete {mode.entity}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {mode.entity}?
        </DialogContentText>
        <DialogContentText>This action is irreversible.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color='error' onClick={handleClose}>
          Cancel
        </Button>
        <SubmitButton color='error'>Delete</SubmitButton>
      </DialogActions>
    </>
  );
}
