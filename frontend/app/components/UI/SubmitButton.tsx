'use client';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ComponentProps {
  children?: ReactNode;
}

export default function SubmitButton({ children }: ComponentProps) {
  const { pending } = useFormStatus();
  return (
    <Button size='large' variant='contained' type='submit' disabled={pending}>
      {pending ? 'submitting...' : children}
    </Button>
  );
}
