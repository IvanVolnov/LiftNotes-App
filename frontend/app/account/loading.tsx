import { CircularProgress, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  );
}
