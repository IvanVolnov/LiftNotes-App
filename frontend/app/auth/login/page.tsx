'use client';
import NextButton from '@/app/components/UI/NextButton';
import { Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';

import { useFormState } from 'react-dom';
import SubmitButton from '@/app/components/UI/SubmitButton';
import { login } from '@/app/lib/authActions';
import { FormEvent, useActionState } from 'react';
import ErrorMessage from '@/app/components/UI/ErrorMessage';

const initialState = {
  message: '',
};

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);

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
        <Typography variant='h4' sx={{ alignSelf: 'start' }}>
          Login
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          variant='filled'
          name='email'
          fullWidth
        />
        <PasswordInput inputName='Password' />
        <SubmitButton>Login to your account</SubmitButton>
      </Stack>
      {state.message && <ErrorMessage>{state?.message}</ErrorMessage>}
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Don’t have an account?</Typography>
        <NextButton href='/auth/registration' size='small'>
          register
        </NextButton>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Want to try it first?</Typography>
        <NextButton size='small'>view demo</NextButton>
      </Stack>
    </>
  );
}
