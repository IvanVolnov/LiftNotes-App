import { Button, Container, Stack, Typography } from '@mui/material';
import NextButton from './components/UI/NextButton';
import { login } from './lib/authActions';
import DemoAccountBlock from './components/DemoAccountBlock';
import EntryLayout from './components/UI/EntryLayout';

export default async function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <EntryLayout>
        <Typography variant='h2'>LiftNotes App</Typography>

        <Stack sx={{ paddingTop: '2rem' }} spacing={1} alignItems='center'>
          <Typography variant='h5' color='primary'>
            Create unique workouts
          </Typography>
          <Typography variant='h5' color='secondary'>
            Track of your progress
          </Typography>
        </Stack>

        <NextButton
          href='/auth/registration'
          variant='contained'
          size='large'
          fullWidth={true}
        >
          register
        </NextButton>
        <NextButton href='/auth/login' variant='outlined' fullWidth={true}>
          login
        </NextButton>

        <DemoAccountBlock />
      </EntryLayout>
    </Container>
  );
}
