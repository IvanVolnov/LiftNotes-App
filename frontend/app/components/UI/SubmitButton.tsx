'use client';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ComponentProps {
  children?: ReactNode;
  color?: 'primary' | 'error';
}

export default function SubmitButton({
  children,
  color = 'primary',
}: ComponentProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      size='large'
      variant='contained'
      type='submit'
      color={color}
      disabled={pending}
    >
      {pending ? 'submitting...' : children}
    </Button>
  );
}
