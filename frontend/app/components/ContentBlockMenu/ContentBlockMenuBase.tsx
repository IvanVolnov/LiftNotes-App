'use client';
import NextButton from '../UI/NextButton';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@mui/material';
import EditMenu from './EditMenu';
import ExerciseMenu from './ExerciseMenu';

interface CustomProps {
  mode: Entity;
  content: Content;
}

export default function ContentBlockMenu({ mode, content }: CustomProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');
  const { name, description } = content;

  if (edit) {
    return <EditMenu mode={mode} content={content} />;
  }

  if (content.optimistic) {
    return <Skeleton animation='wave' width={75} height={56} />;
  }

  if (!content.optimistic)
    return (
      <NextButton
        variant='contained'
        href={`${mode}s/${content.id}?name=${name}&description=${description}`}
      >
        start
      </NextButton>
    );
}
