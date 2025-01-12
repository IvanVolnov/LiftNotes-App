'use client';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';

interface DynamicColorBtnProps extends ButtonProps {
  children?: ReactNode;
  clickFunction?: () => void;
}

export default function DynamicColorBtn({
  children,
  clickFunction,
  ...rest
}: DynamicColorBtnProps) {
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  return (
    <Button
      color={checkIfDark ? 'primary' : 'secondary'}
      type='button'
      onClick={clickFunction}
      {...rest}
    >
      {children}
    </Button>
  );
}
