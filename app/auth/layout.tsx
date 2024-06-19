import { Container, Stack } from '@mui/material';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
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
            borderRadius: '9px',
            p: '2px',
            background:
              'linear-gradient(129deg, rgba(40,210,145,1) 0%, rgba(123,0,199,1) 120%)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}
