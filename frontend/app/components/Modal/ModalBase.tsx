'use client';
import Dialog from '@mui/material/Dialog';
import { useModalContext } from '@/app/context/ModalContext';
import { Paper } from '@mui/material';
import WorkoutDayModal from './WorkoutDayModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import ExerciseModal from './ExerciseModal';
import AddExerciseToDayModal from './AddExerciseToDayModal';

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();

  const isWorkoutOrDay = mode.entity === 'workout' || mode.entity === 'day';
  const isEditOrCreate =
    mode.operation === 'edit' || mode.operation === 'create';
  const isExercise = mode.entity === 'exercise';

  const handleClose = () => {
    toggleModal();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
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
      {isEditOrCreate && isWorkoutOrDay && <WorkoutDayModal />}
      {isEditOrCreate && isExercise && <ExerciseModal />}
      {mode.operation === 'manageList' && isExercise && (
        <AddExerciseToDayModal />
      )}
      {mode.operation === 'delete' && <DeleteConfirmModal />}
    </Dialog>
  );
}
