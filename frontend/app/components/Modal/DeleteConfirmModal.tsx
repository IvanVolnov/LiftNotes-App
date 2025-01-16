'use client';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/Buttons/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import { DialogContentText } from '@mui/material';
import { deleteWorkoutDay } from '@/app/lib/workoutsDaysActions';
import { deleteExercise } from '@/app/lib/exercisesActions';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import { useRouter } from 'next/navigation';

export default function DeleteConfirmModal() {
  const { mode, toggleModal } = useModalContext();
  const { deleteOptimisticData } = useOptimisticContext();
  const router = useRouter();

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!mode.modeData) return;

    deleteOptimisticData(mode.modeData);
    if (mode.entity === 'workout' || mode.entity === 'day')
      deleteWorkoutDay(mode.entity, mode.modeData);
    if (mode.entity === 'exercise')
      deleteExercise(mode.modeData as ExerciseNormalised);

    router.refresh();
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
