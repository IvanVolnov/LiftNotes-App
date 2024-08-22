import { Box, Container, Toolbar } from '@mui/material';
import MenuBar from '../components/MenuBar';

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container
      maxWidth='xl'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
      }}
    >
      <MenuBar />
      <Toolbar />
      <Box
        component='main'
        mt={{ xs: 0, sm: 3 }}
        p={{ xs: 2, sm: 4 }}
        sx={{
          bgcolor: 'secondaryBg.main',
          // maxWidth: '44.00rem',
          borderRadius: '0.63rem',
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
