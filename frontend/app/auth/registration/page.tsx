'use client';
import NextButton from '@/app/components/UI/NextButton';
import { Stack, TextField, Typography } from '@mui/material';
import PasswordInput from '@/app/components/UI/PasswordInput';
import { register } from '@/app/lib/authActions';
import SubmitButton from '@/app/components/UI/SubmitButton';
import { useFormState } from 'react-dom';
import ErrorMessage from '@/app/components/UI/ErrorMessage';
import { FormEvent } from 'react';
import DemoAccountBlock from '@/app/components/DemoAccountBlock';

const initialState = {
  message: '',
};

export default function Registration() {
  const [state, formAction] = useFormState(register, initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };

  return (
    <>
      <Stack
        component='form'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={4}
        sx={{ width: '100%' }}
        onSubmit={handleSubmit}
      >
        <Typography variant='h4' sx={{ alignSelf: 'start', maxWidth: '100%' }}>
          Registration
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          variant='filled'
          name='email'
          fullWidth
        />

        <Typography variant='body2' sx={{ alignSelf: 'start' }}>
          Password must be at least 4 characters long
        </Typography>

        <PasswordInput inputName='Password' />
        <PasswordInput inputName='Confirm Password' />
        {state?.message && <ErrorMessage>{state?.message}</ErrorMessage>}
        <SubmitButton>Register new account</SubmitButton>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Already have an account?</Typography>
        <NextButton href='/auth/login' size='small'>
          login
        </NextButton>
      </Stack>
      <DemoAccountBlock />
    </>
  );
}
