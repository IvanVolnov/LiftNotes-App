import { Container, Stack } from '@mui/material';
import EntryLayout from '../components/UI/EntryLayout';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <EntryLayout>{children}</EntryLayout>
    </Container>
  );
}
