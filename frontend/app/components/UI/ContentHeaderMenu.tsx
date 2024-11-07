import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface CustomProps {
  children?: ReactNode;
}

export default function ContentHeaderMenu({ children }: CustomProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      p={{ xs: 2, sm: 0 }}
      sx={{
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: { xs: 'center', sm: 'space-between' },
      }}
      spacing={2}
    >
      {children}
    </Stack>
  );
}
