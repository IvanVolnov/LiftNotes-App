'use client';
import { ReactNode } from 'react';
import NextButton from './UI/NextButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton, Skeleton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { useModalContext } from '../context/ModalContext';
import { createWorkoutDay } from '../lib/workoutsDaysActions';
import { useOptimisticContext } from '../context/OptimisticLoadingContext';

interface CustomProps {
  children?: ReactNode;

  mode: Entity;
  content: Content;
}

export default function ContentBlockMenu({ mode, content }: CustomProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');
  const { id, name, description } = content;

  const { createOptimisticData, optimisticData, deleteOptimisticData } =
    useOptimisticContext();
  const { toggleModal } = useModalContext();

  const router = useRouter();

  async function copyContent() {
    if (mode === 'workout' || mode === 'day') {
      const formData = new FormData();
      formData.append('name', `${name} copy`);
      formData.append('description', description || '');
      createOptimisticData(formData);
      createWorkoutDay(formData, mode);
      router.refresh();
    }
  }

  if (edit && !content.optimistic) {
    return (
      <Stack direction='row' spacing={1}>
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

  if (edit && content.optimistic) {
    return (
      <Stack direction='row' spacing={3} mr={1}>
        <Skeleton animation='wave' width={25} height={40} />
        <Skeleton animation='wave' width={25} height={40} />
        <Skeleton animation='wave' width={25} height={40} />
      </Stack>
    );
  }

  if (!edit && content.optimistic) {
    return <Skeleton animation='wave' width={75} height={56} />;
  }

  if (!edit && !content.optimistic)
    return <NextButton variant='contained'>start</NextButton>;
}
