'use client';
import Dialog from '@mui/material/Dialog';
import { useModalContext } from '@/app/context/ModalContext';
import { Paper } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import WorkoutDayModal from './WorkoutDayModal';
import {
  createWorkoutDay,
  deleteWorkoutDay,
  editWorkoutDay,
} from '@/app/lib/workoutsDaysActions';
import DeleteConfirmModal from './DeleteConfirmModal';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import ExerciseModal from './ExerciseModal';
import {
  createExercise,
  deleteExercise,
  editExercise,
} from '@/app/lib/exercisesActions';

interface CustomProps {
  isOpened: boolean;
}

export default function ModalBase({ isOpened }: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const { createOptimisticData, deleteOptimisticData, editOptimisticData } =
    useOptimisticContext();
  const router = useRouter();
  const currentPath = usePathname();
  const parentId = currentPath.split('/').slice(3).toString();

  const isWorkoutOrDay = mode.entity === 'workout' || mode.entity === 'day';
  const isEditOrCreate =
    mode.operation === 'edit' || mode.operation === 'create';
  const isExercise = mode.entity === 'exercise';

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mode.operation === 'create') {
      createOptimisticData(formData);
      if (isWorkoutOrDay) createWorkoutDay(formData, mode.entity, parentId);
      if (isExercise) createExercise(formData);
    }

    if (mode.operation === 'edit' && mode.modeData) {
      editOptimisticData(formData, mode.modeData);
      if (isWorkoutOrDay) editWorkoutDay(formData, mode.entity, mode.modeData);
      if (isExercise)
        editExercise(formData, mode.modeData as ExerciseNormalised);
    }
    if (mode.operation === 'delete' && mode.modeData) {
      console.log(mode.modalData);
      deleteOptimisticData(mode.modeData);
      if (isWorkoutOrDay) deleteWorkoutDay(mode.entity, mode.modeData);
      if (isExercise) deleteExercise(mode.modeData as ExerciseNormalised);
    }

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
            sx={{
              bgcolor: 'contentBg.main',
              filter: 'none',
            }}
          />
        )}
      >
        {isEditOrCreate && isWorkoutOrDay && <WorkoutDayModal />}
        {isEditOrCreate && isExercise && <ExerciseModal />}
        {mode.operation === 'delete' && <DeleteConfirmModal />}
      </Dialog>
    </>
  );
}
