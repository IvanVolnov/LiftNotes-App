import { Card, CardContent, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ContentBlockMenu from './ContentBlockMenu/ContentBlockMenuBase';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragButton from '../UI/Buttons/DragButton';

interface CustomProps {
  children?: ReactNode;
  content: Content;
  mode: Entity;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ContentBlock({ content, mode }: CustomProps) {
  const { id } = content;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Card
      sx={{
        bgcolor: 'contentBg.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '1rem',
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'manipulation',
      }}
      ref={setNodeRef}
    >
      <Stack direction='row'>
        <DragButton
          attributes={attributes}
          listeners={listeners}
          optimistic={content.optimistic}
        />

        <CardContent sx={{ maxWidth: '28rem', overflow: 'hidden' }}>
          <Typography gutterBottom variant='h5' component='div'>
            {content.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {content.description}
          </Typography>
        </CardContent>
      </Stack>
      <ContentBlockMenu mode={mode} content={content} />
    </Card>
  );
}
