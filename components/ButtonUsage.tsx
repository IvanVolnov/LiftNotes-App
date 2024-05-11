import * as React from 'react';
import Button from '@mui/material/Button';

interface Prop {
  children: React.ReactNode;
}

export default function ButtonUsage({ children }: Prop) {
  return <Button variant='contained'>{children}</Button>;
}
