'use client';
import NextButton from '@/app/components/UI/NextButton';
import { Button, Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';

import { useFormState } from 'react-dom';
// import loginHandler from './actions';
import SubmitButton from '@/app/components/UI/SubmitButton';
import { login } from '@/app/lib/authActions';
import { redirect } from 'next/navigation';
import { FormEvent, useActionState } from 'react';

const initialState = {
  message: '',
};

// async function loginHandler(prevState: any, formData: FormData) {
//   try {
//     await login(formData);
//     redirect('/account/workouts');
//   } catch (error) {
//     return { message: error };
//   }
// }

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
      {state && <p aria-live='polite'>{state?.message}</p>}
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Don’t have an account?</Typography>
        <NextButton href='/auth/registration' size='small'>
          register
        </NextButton>
      </Stack>
    </>
  );
}
