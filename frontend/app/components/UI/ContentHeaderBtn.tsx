'use client';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useModalContext } from '@/app/context/ModalContext';

interface MyProps {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  entity?: Entity;
}

export default function ContentHeaderBtn({
  children,
  size = 'large',
  entity,
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
      color={checkIfDark ? 'primary' : 'secondary'}
      variant='outlined'
      size={size}
      sx={{ textTransform: 'uppercase' }}
      type='button'
      onClick={
        edit
          ? () => deleteQueryParam('edit')
          : () => toggleModal(entity, 'create')
      }
      disableElevation
    >
      {edit ? 'exit management mode' : children}
    </Button>
  );
}
