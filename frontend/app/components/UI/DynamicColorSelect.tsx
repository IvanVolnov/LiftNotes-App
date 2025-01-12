'use client';

import React from 'react';
import { Select, SelectProps } from '@mui/material';
import { useColorModeContext } from '@/app/context/ColorModeContext';

export type DynamicColorSelectProps<T = unknown> = SelectProps<T> & {};

export default function DynamicColorSelect<T = unknown>({
  children,
  ...rest
}: DynamicColorSelectProps<T>) {
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  return (
    <Select {...rest} color={checkIfDark ? 'primary' : 'secondary'}>
      {children}
    </Select>
  );
}
