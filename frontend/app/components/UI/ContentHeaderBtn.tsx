'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useModalContext } from '@/app/context/ModalContext';

interface MyProps {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  type?: string;
  clickFunction?: () => void;
}

export default function ContentHeaderBtn({
  children,
  size = 'large',
  href = '',
  type = 'button',
}: MyProps) {
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');
  const router = useRouter();
  const currentPath = usePathname();

  const deleteQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`${currentPath}?${params.toString()}`);
  };

  const { toggleModal } = useModalContext();

  return (
    <Button
      color={checkIfDark ? 'primary' : 'contentBg'}
      component={href ? Link : Button}
      variant={checkIfDark ? 'outlined' : 'contained'}
      size={size}
      href={href}
      sx={{ textTransform: 'uppercase' }}
      type={type}
      onClick={
        edit
          ? () => deleteQueryParam('edit')
          : () => toggleModal('workout', 'create')
      }
      disableElevation
    >
      {edit ? 'exit management mode' : children}
    </Button>
  );
}
