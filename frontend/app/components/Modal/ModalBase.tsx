'use client';
import Dialog from '@mui/material/Dialog';
import { useModalContext } from '@/app/context/ModalContext';
import { Paper } from '@mui/material';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';
import WorkoutDayModal from './WorkoutDayModal';
import { createWorkoutDay } from '@/app/lib/workoutsDaysActions';

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      mode.operation === 'create' &&
      (mode.entity === 'workout' || mode.entity === 'day')
    )
      createWorkoutDay(formData, mode.entity);

    startTransition(() => {
      router.refresh();
    });
    handleClose();
  };

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
          onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(event),
        }}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{ bgcolor: 'contentBg.main', filter: 'none' }}
          />
        )}
      >
        {mode.entity === ('workout' || 'day') && <WorkoutDayModal />}
      </Dialog>
    </>
  );
}
