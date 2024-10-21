'use client';
import Dialog from '@mui/material/Dialog';
import { useModalContext } from '@/app/context/ModalContext';
import { Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import WorkoutDayModal from './WorkoutDayModal';
import {
  createWorkoutDay,
  deleteWorkoutDay,
  editWorkoutDay,
} from '@/app/lib/workoutsDaysActions';
import DeleteConfirmModal from './DeleteConfirmModal';

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const router = useRouter();

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      mode.operation === 'create' &&
      (mode.entity === 'workout' || mode.entity === 'day')
    )
      await createWorkoutDay(formData, mode.entity);

    if (
      mode.operation === 'edit' &&
      mode.modeData &&
      (mode.entity === 'workout' || mode.entity === 'day')
    )
      await editWorkoutDay(formData, mode.entity, mode.modeData);

    if (
      mode.operation === 'delete' &&
      mode.modeData &&
      (mode.entity === 'workout' || mode.entity === 'day')
    )
      await deleteWorkoutDay(mode.entity, mode.modeData);

    router.refresh();
    handleClose();
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
        {(mode.operation === 'edit' || mode.operation === 'create') &&
          (mode.entity === 'workout' || mode.entity === 'day') && (
            <WorkoutDayModal />
          )}
        {mode.operation === 'delete' && <DeleteConfirmModal />}
      </Dialog>
    </>
  );
}
