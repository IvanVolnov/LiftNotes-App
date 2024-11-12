'use client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import ContentBlockMenu from './ContentBlockMenu/ContentBlockMenuBase';
import DragButton from './UI/DragButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSearchParams } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandMoreBtn } from './UI/ExpandMoreBtn';
import daysAgo from '../utils/daysAgo';
import ExerciseTable from './UI/ExerciseTable';

interface CustomProps {
  children?: ReactNode;
  content: ExerciseNormalised;
}

export default function ExerciseContentBlock({ content }: CustomProps) {
  console.log(content);
  const { id } = content;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const mode = 'exercise';

  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  const [expanded, setExpanded] = useState(false);

  useEffect(() => setExpanded(false), [edit]);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card
      sx={{
        bgcolor: 'contentBg.main',
        display: 'flex',
        flexDirection: 'column',
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'manipulation',
      }}
      ref={setNodeRef}
    >
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction='row'>
          <DragButton
            attributes={attributes}
            listeners={listeners}
            optimistic={content.optimistic}
          />

          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {content.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              result updated {daysAgo(content.exerciseLastUpdated)}
            </Typography>
          </CardContent>
        </Stack>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
          useFlexGap
        >
          {edit ? (
            <ContentBlockMenu mode={mode} content={content} />
          ) : (
            <>
              {content.exerciseType && (
                <Chip label={content.exerciseType} color='secondary' />
              )}
              <ExpandMoreBtn
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
                sx={{ marginRight: '1rem' }}
              >
                <ExpandMoreIcon />
              </ExpandMoreBtn>
            </>
          )}
        </Stack>
      </Stack>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent
          sx={{
            paddingTop: '0px',
          }}
        >
          <Typography variant='body2'>{content?.description}</Typography>
          <Divider />
          <Stack direction='row' spacing={3} alignItems='center'>
            <Typography variant='body1'>how the training was?</Typography>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography variant='body2'>normal</Typography>
              <Switch checked={content.previousTrainingWasEasy} />
              <Typography variant='body2'>easy</Typography>
            </Stack>
          </Stack>
          {content.exerciseResults.length ? (
            <ExerciseTable results={content.exerciseResults} />
          ) : (
            <Typography variant='body2'>No results recorded yet...</Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '0rem 1rem 1rem 0rem',
          }}
        >
          <Button size='small' variant='contained'>
            Update result
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
