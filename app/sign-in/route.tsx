'use client';
import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  FilledInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={4}
      p={5}
      sx={{
        maxWidth: '400px',
        bgcolor: '#090C0B',
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
      <TextField id='email' type='email' label='Email' variant='filled' />
      <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
        <InputLabel htmlFor='filled-adornment-password'>Password</InputLabel>
        <FilledInput
          id='filled-adornment-password'
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button size='large' variant='contained'>
        Login to your account
      </Button>
      <Stack direction='row' spacing={1}>
        <Typography variant='body1'>Don’t have an account?</Typography>
        <Link href='/registration' underline='hover'>
          REGISTER
        </Link>
      </Stack>
      <Stack direction='row' spacing={1}>
        <Typography variant='body1'>Want to try it first?</Typography>
        <Link href='/demo' underline='hover'>
          VIEW DEMO
        </Link>
      </Stack>
    </Stack>
  );
}
