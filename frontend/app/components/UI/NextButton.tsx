import Link from 'next/link';
import { Button } from '@mui/material';
import { ReactNode } from 'react';

interface MyProps {
  children?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'third';
  type?: string;
}

export default function NextButton({
  children,
  variant = 'text',
  size = 'medium',
  href = '#',
  color = 'primary',
  type = 'button',
}: MyProps) {
  return (
    <Button
      color={color}
      component={Link}
      variant={variant}
      size={size}
      href={href}
      sx={{ textTransform: 'uppercase' }}
      type={type}
    >
      {children}
    </Button>
  );
}
