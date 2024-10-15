'use client';
import { useSearchParams } from 'next/navigation';
import { Box, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface DragButtonProps {
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: SyntheticListenerMap | undefined;
}

export default function DragButton({ attributes, listeners }: DragButtonProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  return (
    edit && (
      <Box sx={{ alignSelf: 'center' }} {...attributes} {...listeners}>
        <IconButton
          aria-label='drag'
          size='medium'
          sx={{ alignSelf: 'center' }}
          disableFocusRipple={true}
        >
          <DragIndicatorIcon />
        </IconButton>
      </Box>
    )
  );
}
