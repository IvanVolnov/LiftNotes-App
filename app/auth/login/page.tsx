import NextButton from '@/app/components/UI/NextButton';
import { Stack, TextField, Typography } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';
import DarkModeSwicher from '@/app/components/DarkModeSwicher';

export default function Login() {
  return (
    <>
      <Typography variant='h4' sx={{ alignSelf: 'start' }}>
        Login
      </Typography>
      <TextField
        id='email'
        type='email'
        label='Email'
        variant='filled'
        fullWidth
      />
      <PasswordInput inputName='Password' />
      <NextButton size='large' variant='contained'>
        Login to your account
      </NextButton>
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
      <DarkModeSwicher />
    </>
  );
}
