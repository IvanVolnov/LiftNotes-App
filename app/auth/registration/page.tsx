import NextButton from '@/app/components/UI/NextButton';
import { Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';

export default function Login() {
  return (
    <>
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
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Already have an account</Typography>
        <NextButton href='/auth/login' size='small'>
          login
        </NextButton>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Want to try it first?</Typography>
        <NextButton size='small'>view demo</NextButton>
      </Stack>
    </>
  );
}
