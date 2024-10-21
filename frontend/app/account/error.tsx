'use client';

import { Button, Stack, Typography } from '@mui/material';
import NextButton from '../components/UI/NextButton';
import SubmitButton from '../components/UI/SubmitButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack spacing={2}>
      <Typography variant='h2'>Something went wrong!</Typography>
      <Typography variant='body1'>{error.message}</Typography>
      <Button onClick={() => reset()}>Try again</Button>
    </Stack>
  );
}
