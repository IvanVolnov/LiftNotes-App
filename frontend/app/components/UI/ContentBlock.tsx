import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';
import NextButton from './NextButton';

interface CustomProps {
  children?: ReactNode;
  id: string;
  header: string;
  text?: string;
  href?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ContentBlock({
  id,
  header,
  text,
  href,
  searchParams,
}: CustomProps) {
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
        <Typography variant='body2' color='text.secondary'>
          gfhm
        </Typography>
      </CardContent>
      <NextButton variant='contained' href={href}>
        start
      </NextButton>
    </Card>
  );
}
