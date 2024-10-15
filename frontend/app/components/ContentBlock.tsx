import { Card, CardContent, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ContentBlockMenu from './ContentBlockMenu';
import { Entity } from '../context/ModalContext';
import DragButton from './UI/DragButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CustomProps {
  children?: ReactNode;
  id: string;
  header: string;
  text?: string;
  mode: Entity;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ContentBlock({ id, header, text, mode }: CustomProps) {
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
        <DragButton attributes={attributes} listeners={listeners} />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {header}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {text}
          </Typography>
        </CardContent>
      </Stack>
      <ContentBlockMenu id={id} mode={mode} name={header} description={text}>
        start
      </ContentBlockMenu>
    </Card>
  );
}
