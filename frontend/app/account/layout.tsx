import { Box, Container, Toolbar } from '@mui/material';
import MenuBar from '../components/MenuBar';

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container
      sx={{
        display: 'flex',
      }}
    >
      <MenuBar />
      <Box component='main'>
        <Toolbar />
        {children}
      </Box>
    </Container>
  );
}
