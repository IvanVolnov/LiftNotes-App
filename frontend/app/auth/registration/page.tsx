import NextButton from '@/app/components/UI/NextButton';
import { Button, Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';
import { register } from '@/app/lib/authActions';
import { redirect } from 'next/navigation';
import SubmitButton from '@/app/components/UI/SubmitButton';

export default async function Registration() {
  async function registrationHandler(formData: FormData) {
    'use server';

    const data = await register(formData);

    redirect('/auth/login');
  }

  // add more user friendly errors

  return (
    <>
      <Stack
        component='form'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={4}
        sx={{ width: '100%' }}
        action={registrationHandler}
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
        <SubmitButton>Register new account</SubmitButton>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Already have an account?</Typography>
        <NextButton href='/auth/login' size='small'>
          login
        </NextButton>
      </Stack>
    </>
  );
}
