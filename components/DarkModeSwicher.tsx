'use client';
import { DarkMode } from '@mui/icons-material';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function DarkModeSwicher() {
  // const router = useRouter();
  const params = useSearchParams();
  const currentMode = params.get('mode');
  console.log(currentMode);

  // router.push(`?theme=dark`);
  function switchHandler() {
    // router.replace('?mode=light', { scroll: false });
  }

  return (
    <>
      <FormControl component='fieldset'>
        <FormControlLabel
          value='dark mode'
          control={<Switch color='primary' />}
          label={<DarkMode sx={{ position: 'relative', top: '0.2rem' }} />}
          labelPlacement='start'
          onClick={switchHandler}
        />
      </FormControl>
    </>
  );
}
