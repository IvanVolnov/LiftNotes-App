'use client';

import { useModalContext } from '@/app/context/ModalContext';
import { Button, Dialog, DialogActions, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import CreateResultModal from './CreateResultModal';
import EditResultsModal from './EditResultsModal';
import SubmitButton from '../../UI/SubmitButton';
import DeleteConfirmModal from '../DeleteConfirmModal';
import { useState } from 'react';
import ErrorMessage from '../../UI/ErrorMessage';

interface CustomProps {
  isOpened: boolean;
}

export default function ResultsModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const isEdit = mode.operation === 'edit';
  const isCreate = mode.operation === 'create';

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const repsValues = formData.getAll('reps').map((val) => Number(val));
    const setsValues = formData.getAll('sets').map((val) => Number(val));
    const weightValues = formData
      .getAll('weightAmount')
      .map((val) => Number(val));

    function validateResults() {
      if (repsValues.some((el) => el <= 0)) {
        setErrorMessage('All reps must be greater than 0.');
        return false;
      }
      if (setsValues.some((el) => el <= 0)) {
        setErrorMessage('All sets must be greater than 0.');
        return false;
      }
      if (weightValues.some((el) => el <= 0)) {
        setErrorMessage('All weights must be greater than 0.');
        return false;
      }
      return true;
    }

    if (!validateResults()) {
      return;
    }

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
      {isCreate && <CreateResultModal error={errorMessage} />}
      {mode.operation === 'delete' && <DeleteConfirmModal />}
    </Dialog>
  );
}
