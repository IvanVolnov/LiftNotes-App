import NextButton from '@/app/components/UI/NextButton';
import { Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';

export default async function Login() {
  // const session = await getSession();
  return (
    <>
      <Stack
        component='form'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={4}
        sx={{ width: '100%' }}
      >
        <Typography variant='h4' sx={{ alignSelf: 'start' }}>
          Registration
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          variant='filled'
          fullWidth
        />
        <PasswordInput inputName='Password' />
        <PasswordInput inputName='Confirm Password' />
        <NextButton size='large' variant='contained'>
          Register new account
        </NextButton>
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
