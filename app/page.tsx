import { Container } from '@mui/material';
import Login from './auth/login/page';

export default function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <h1>Entry page</h1>
    </Container>
  );
}
