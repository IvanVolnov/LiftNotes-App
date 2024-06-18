'use client';
import NextButton from '@/app/components/UI/NextButton';
import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';

import PasswordInput from '@/app/components/UI/PasswordInput';
import DarkModeSwicher from '@/app/components/DarkModeSwicher';

export default function SignIn() {
  const theme = useTheme();

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
      p={5}
      sx={{
        mt: { xs: '5vh', sm: '15vh' },
        minWidth: 'min(98vw, 25rem)',
        borderRadius: '10px',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background:
            'linear-gradient(129deg, rgba(40,210,145,1) 0%, rgba(123,0,199,1) 120%)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        },
      }}
    >
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
      <PasswordInput />
      <NextButton size='large' variant='contained'>
        Login to your account
      </NextButton>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Don’t have an account?</Typography>
        <NextButton href='/registration' size='small'>
          REGISTER
        </NextButton>
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body1'>Want to try it first?</Typography>
        <NextButton href='/demo' size='small'>
          VIEW DEMO
        </NextButton>
      </Stack>
      <DarkModeSwicher />
      {/* <Button variant='outlined' color={theme.palette.ochre?.main}>
        gegwr
      </Button> */}
    </Stack>
  );
}
