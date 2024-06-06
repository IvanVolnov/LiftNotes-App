'use client';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { DarkMode } from '@mui/icons-material';
import { FormControl, FormControlLabel, Switch } from '@mui/material';

export default function DarkModeSwicher() {
  const { colorMode, toggleColorMode } = useColorModeContext();

  return (
    <>
      <h1>{colorMode}</h1>
      <FormControl component='fieldset'>
        <FormControlLabel
          value='dark mode'
          control={<Switch color='primary' />}
          label={<DarkMode sx={{ position: 'relative', top: '0.2rem' }} />}
          labelPlacement='start'
          onClick={toggleColorMode}
          defaultChecked={colorMode === 'dark'}
        />
      </FormControl>
    </>
  );
}
