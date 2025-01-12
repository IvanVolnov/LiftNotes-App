'use client';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SubmitButton from '../UI/Buttons/SubmitButton';
import { useModalContext } from '@/app/context/ModalContext';
import DynamicColorBtn from '../UI/Buttons/DynamicColorBtn';
import DynamicColorTextFeild from '../UI/DynamicColorTextfeild';

export default function WorkoutDayModal() {
  const { mode, toggleModal } = useModalContext();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
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
    </>
  );
}
