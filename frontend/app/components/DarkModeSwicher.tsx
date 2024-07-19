'use client';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { DarkMode } from '@mui/icons-material';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DarkModeSwicher() {
  const { toggleColorMode, checkIfDarkMode } = useColorModeContext();

  const checkIfDark = checkIfDarkMode();

  return (
    <>
      <FormControl component='fieldset'>
        <FormControlLabel
          value='dark mode'
          control={<Switch color='primary' checked={checkIfDark} />}
          label={<DarkMode sx={{ position: 'relative', top: '0.2rem' }} />}
          labelPlacement='start'
          onClick={toggleColorMode}
          defaultChecked
        />
      </FormControl>
    </>
  );
}
