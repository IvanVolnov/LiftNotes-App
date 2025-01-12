'use client';
import { useSearchParams } from 'next/navigation';
import { Box, IconButton, Skeleton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';

interface DragButtonProps {
  attributes: React.HTMLAttributes<HTMLElement>;
  listeners: SyntheticListenerMap | undefined;
  optimistic?: boolean;
}

export default function DragButton({ attributes, listeners }: DragButtonProps) {
  const { optimisticData } = useOptimisticContext();

  const isOptimisticLoading = optimisticData.some(
    (el) => el.optimistic === true
  );

  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  if (edit && !isOptimisticLoading) {
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

  if (edit && isOptimisticLoading) {
    return (
      <Skeleton
        animation='wave'
        width={15}
        height={40}
        sx={{ marginTop: '1rem', marginLeft: '0.8rem', marginRight: '0.8rem' }}
      />
    );
  }

  if (!edit) {
    return <></>;
  }
}
