'use client';

import { useModalContext } from '@/app/context/ModalContext';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import { createWorkoutDay } from '@/app/lib/workoutsDaysActions';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';

interface CustomProps {
  mode: Entity;
  content: Content;
}

export default function EditMenu({ mode, content }: CustomProps) {
  const { name, description, parentId } = content;
  const { createOptimisticData } = useOptimisticContext();
  const { toggleModal } = useModalContext();

  const router = useRouter();

  async function copyContent() {
    if (mode === 'workout' || mode === 'day') {
      const formData = new FormData();
      formData.append('name', `${name} copy`);
      formData.append('description', description || '');
      createOptimisticData(formData);
      createWorkoutDay(formData, mode, parentId);
      router.refresh();
    }
  }

  if (!content.optimistic) {
    return (
      <Stack
        direction='row'
        spacing={1}
        sx={{ marginRight: mode === 'exercise' ? '1rem' : '' }}
      >
        <IconButton
          aria-label='delete'
          size='medium'
          onClick={() => toggleModal(mode, 'delete', content)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label='copy'
          size='medium'
          onClick={() => copyContent()}
        >
          <ContentCopyIcon />
        </IconButton>
        <IconButton
          aria-label='edit'
          size='medium'
          onClick={() => toggleModal(mode, 'edit', content)}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    );
  }

  if (content.optimistic) {
    return (
      <Stack direction='row' spacing={3} mr={1}>
        <Skeleton animation='wave' width={25} height={40} />
        <Skeleton animation='wave' width={25} height={40} />
        <Skeleton animation='wave' width={25} height={40} />
      </Stack>
    );
  }
}
