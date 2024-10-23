'use client';
import { ReactNode } from 'react';
import NextButton from './UI/NextButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { useModalContext } from '../context/ModalContext';
import { createWorkoutDay } from '../lib/workoutsDaysActions';

interface CustomProps {
  children?: ReactNode;
  id: string;
  mode: Entity;
  name: string;
  description?: string;
}

export default function ContentBlockMenu({
  mode,
  id,
  name,
  description,
}: CustomProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  const { toggleModal } = useModalContext();

  const router = useRouter();

  async function copyContent() {
    if (mode === 'workout' || mode === 'day') {
      const formData = new FormData();
      formData.append('entityName', `${name} copy`);
      formData.append('entityDescription', description || '');
      await createWorkoutDay(formData, mode);
      router.refresh();
    }
  }

  return edit ? (
    <Stack direction='row' spacing={1}>
      <IconButton
        aria-label='delete'
        size='medium'
        onClick={() => toggleModal(mode, 'delete', { id, name, description })}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label='copy' size='medium' onClick={() => copyContent()}>
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        aria-label='edit'
        size='medium'
        onClick={() => toggleModal(mode, 'edit', { id, name, description })}
      >
        <EditIcon />
      </IconButton>
    </Stack>
  ) : (
    <NextButton variant='contained'>start</NextButton>
  );
}
