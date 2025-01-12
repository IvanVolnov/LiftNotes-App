'use client';
import { Stack, Typography } from '@mui/material';
import SubmitButton from './UI/Buttons/SubmitButton';
import { useFormState } from 'react-dom';
import { login } from '../lib/authActions';

const initialState = {
  message: '',
};

export default function DemoAccountBlock() {
  const [state, formAction] = useFormState(login, initialState);
  const handleTryDemo = () => {
    const demoData = new FormData();
    demoData.append('email', 'demoaccount@demo.com');
    demoData.append('password', 'demo');
    formAction(demoData);
  };

  return (
    <Stack
      direction='row'
      spacing={1}
      alignItems='center'
      component='form'
      action={handleTryDemo}
    >
      <Typography variant='body1'>Want to try it first?</Typography>
      <SubmitButton variant='text' size='small'>
        view Demo
      </SubmitButton>
    </Stack>
  );
}
