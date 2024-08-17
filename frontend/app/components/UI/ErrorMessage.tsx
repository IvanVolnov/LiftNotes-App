import { Alert } from '@mui/material';
import { ReactNode } from 'react';

interface MyProps {
  children?: ReactNode;
}
export default function ErrorMessage({ children }: MyProps) {
  return (
    <Alert variant='outlined' severity='error'>
      {children}
    </Alert>
  );
}
