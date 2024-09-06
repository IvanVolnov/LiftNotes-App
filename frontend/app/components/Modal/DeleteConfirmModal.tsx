'use client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';

export default function DeleteConfirmModal() {
  const { mode, toggleModal } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <DialogTitle>Are you sure?</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </>
  );
}
