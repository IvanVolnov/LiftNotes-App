'use client';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/Buttons/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import DynamicColorBtn from '../UI/Buttons/DynamicColorBtn';
import DynamicColorTextFeild from '../UI/DynamicColorTextFeild';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import { usePathname, useRouter } from 'next/navigation';
import {
  createWorkoutDay,
  editWorkoutDay,
} from '@/app/lib/workoutsDaysActions';

export default function WorkoutDayModal() {
  const { mode, toggleModal } = useModalContext();

  const { createOptimisticData, editOptimisticData } = useOptimisticContext();
  const router = useRouter();
  const currentPath = usePathname();
  const parentId = currentPath.split('/').slice(3).toString();

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mode.operation === 'create') {
      createOptimisticData(formData);
      createWorkoutDay(formData, mode.entity, parentId);
    }

    if (mode.operation === 'edit' && mode.modeData) {
      editOptimisticData(formData, mode.modeData);
      editWorkoutDay(formData, mode.entity, mode.modeData);
    }

    router.refresh();
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>
        {`${mode.operation} 
        ${mode.entity}`}
      </DialogTitle>
      <DialogContent>
        <DynamicColorTextFeild
          autoFocus
          required
          margin='dense'
          id='name'
          name='name'
          label='Name'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={mode.modeData?.name}
        />
        <DynamicColorTextFeild
          margin='dense'
          id='description'
          name='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          defaultValue={mode.modeData?.description}
        />
      </DialogContent>
      <DialogActions>
        <DynamicColorBtn onClick={handleClose}>Cancel</DynamicColorBtn>
        <SubmitButton>Submit</SubmitButton>
      </DialogActions>
    </form>
  );
}
