'use client';
import { ReactNode } from 'react';
import NextButton from './UI/NextButton';
import { useSearchParams } from 'next/navigation';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';

interface CustomProps {
  children?: ReactNode;
  id: string;
  mode: 'workout' | 'day' | 'excercise';
}

export default function ContentBlockMenu({ mode, id }: CustomProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  return edit ? (
    <Stack direction='row' spacing={1}>
      <IconButton aria-label='delete' size='medium'>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label='delete' size='medium'>
        <ContentCopyIcon />
      </IconButton>
      <IconButton aria-label='delete' size='medium'>
        <EditIcon />
      </IconButton>
    </Stack>
  ) : (
    <NextButton variant='contained'>start</NextButton>
  );
}
