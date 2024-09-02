import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ContentBlockMenu from './ContentBlockMenu';
import { Entity } from '../context/ModalContext';

interface CustomProps {
  children?: ReactNode;
  id: string;
  header: string;
  text?: string;
  mode: Entity;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ContentBlock({ id, header, text, mode }: CustomProps) {
  return (
    <Card
      sx={{
        bgcolor: 'contentBg.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '1rem',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {header}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {text}
        </Typography>
      </CardContent>
      <ContentBlockMenu id={id} mode={mode} name={header} description={text}>
        start
      </ContentBlockMenu>
    </Card>
  );
}
