'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface MyProps {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  type?: string;
  clickFunction?: () => void;
}

export default function ContentFooterBtn({
  children,
  size = 'large',
  href = '',
  type = 'button',
  clickFunction,
}: MyProps) {
  const { checkIfDarkMode } = useColorModeContext();

  const checkIfDark = checkIfDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = usePathname();

  const addQueryParam = () => {
    const params = new URLSearchParams(searchParams);
    params.set('edit', 'true');
    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    !searchParams.get('edit') && (
      <Button
        color={checkIfDark ? 'primary' : 'secondary'}
        component={href ? Link : Button}
        variant='text'
        size={size}
        href={href}
        sx={{ textTransform: 'uppercase', alignSelf: 'center' }}
        type={type}
        onClick={addQueryParam}
      >
        {children}
      </Button>
    )
  );
}
