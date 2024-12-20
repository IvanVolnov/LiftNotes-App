'use client';

import { useModalContext } from '@/app/context/ModalContext';
import { Button, Dialog, DialogActions, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import CreateResultModal from './CreateResultModal';
import EditResultsModal from './EditResultsModal';
import SubmitButton from '../../UI/SubmitButton';

interface CustomProps {
  isOpened: boolean;
}

export default function ResultsModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();

  const isEdit = mode.operation === 'edit';
  const isCreate = mode.operation === 'create';

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mode.operation === 'create') {
    }

    if (mode.operation === 'edit' && mode.modeData) {
    }

    router.refresh();
    handleClose();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(event),
      }}
      PaperComponent={(props) => (
        <Paper
          {...props}
          sx={{
            bgcolor: 'contentBg.main',
            filter: 'none',
          }}
        />
      )}
    >
      {isEdit && <EditResultsModal />}
      {isCreate && <CreateResultModal />}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </Dialog>
  );
}
