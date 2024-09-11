'use client';
import { useSearchParams } from 'next/navigation';
import { IconButton } from '@mui/material';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface CustomProps {}

export default function DragButton() {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  return (
    edit && (
      <IconButton
        aria-label='drag'
        size='medium'
        sx={{ alignSelf: 'center' }}
        onClick={() => {}}
      >
        <DragIndicatorIcon />
      </IconButton>
    )
  );
}
