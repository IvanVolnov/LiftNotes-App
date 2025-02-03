'use client';
import { Container, Stack, Toolbar } from '@mui/material';
import MenuBar from '../components/MenuBar';
import { ModalProvider } from '../context/ModalContext';
import { OptimisticProvider } from '../context/OptimisticLoadingContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en-gb';

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <OptimisticProvider>
        <ModalProvider>
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
            <Stack
              component='main'
              mt={{ xs: 0, sm: 3 }}
              p={{ xs: 0, sm: 4 }}
              sx={{
                bgcolor: 'secondaryBg.main',
                minWidth: 'min(100vw, 44rem)',
                maxWidth: '44rem',
                borderRadius: '0.63rem',
              }}
            >
              {children}
            </Stack>
          </Container>
        </ModalProvider>
      </OptimisticProvider>
    </LocalizationProvider>
  );
}
