'use client';
import { useSearchParams } from 'next/navigation';
import { Box, IconButton, Skeleton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface DragButtonProps {
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: SyntheticListenerMap | undefined;
  optimistic?: boolean;
}

export default function DragButton({
  attributes,
  listeners,
  optimistic,
}: DragButtonProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  if (edit && !optimistic) {
    return (
      edit && (
        <Box
          sx={{ alignSelf: 'center', touchAction: 'manipulation' }}
          {...attributes}
          {...listeners}
        >
          <IconButton
            aria-label='drag'
            size='medium'
            sx={{ alignSelf: 'center', touchAction: 'manipulation' }}
            disableFocusRipple={true}
          >
            <DragIndicatorIcon />
          </IconButton>
        </Box>
      )
    );
  }

  if (edit && optimistic) {
    return <Skeleton animation='wave' width={25} height={40} />;
  }

  if (!edit) {
    return <></>;
  }
}
