'use client';
import { Button, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ComponentProps {
  children?: ReactNode;
  color?: 'primary' | 'error';
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'text' | 'outlined';
}

export default function SubmitButton({
  children,
  color = 'primary',
  size = 'large',
  variant = 'contained',
}: ComponentProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      variant={variant}
      type='submit'
      color={color}
      disabled={pending}
    >
      {pending ? 'loading...' : children}
    </Button>
  );
}
