import SignIn from './sign-in/route';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <SignIn />
    </Container>
  );
}
