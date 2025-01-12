'use client';
import { TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';

type DynamicColorTextFieldProps = ComponentProps<typeof TextField>;

export default function DynamicColorTextFeild({
  ...rest
}: DynamicColorTextFieldProps) {
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  return <TextField color={checkIfDark ? 'primary' : 'secondary'} {...rest} />;
}
