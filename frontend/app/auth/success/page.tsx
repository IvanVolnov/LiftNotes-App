import NextButton from '@/app/components/UI/Buttons/NextButton';
import { Typography } from '@mui/material';

export default async function Success() {
  return (
    <>
      <Typography variant='h4'>Success!</Typography>
      <Typography variant='h1'>🎉</Typography>
      <Typography variant='body1' sx={{ textAlign: 'center' }}>
        Congratulations, your account has been succesfully created.
      </Typography>
      <NextButton href='/auth/login' size='large'>
        go to login page
      </NextButton>
    </>
  );
}
