import NextButton from '@/app/components/UI/NextButton';
import { Button, Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';
import { login } from '../../lib/authActions';
import { redirect } from 'next/navigation';

export default async function Login() {
  async function loginHandler(formData: FormData) {
    'use server';
    await login(formData);
    redirect('/account/workouts');
  }
  return (
    <>
      <Stack
        component='form'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={4}
        sx={{ width: '100%' }}
        action={loginHandler}
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
        <Button size='large' variant='contained' type='submit'>
          Login to your account
        </Button>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Don’t have an account?</Typography>
        <NextButton href='/auth/registration' size='small'>
          register
        </NextButton>
      </Stack>
    </>
  );
}
