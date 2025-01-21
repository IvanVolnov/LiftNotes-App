'use client';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import ContentBlockMenu from './ContentBlockMenu/ContentBlockMenuBase';
import DragButton from '../UI/Buttons/DragButton';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSearchParams } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMoreBtn } from '../UI/Buttons/ExpandMoreBtn';
import daysAgo from '../../utils/daysAgo';
import ExerciseTable from './ExerciseContentLogic/ResultsTable/ExerciseTable';
import PreviousTrainingSwitcher from './ExerciseContentLogic/PreviousTrainingSwitcher';
import { useModalContext } from '@/app/context/ModalContext';
import DynamicColorBtn from '../UI/Buttons/DynamicColorBtn';
import { useColorModeContext } from '@/app/context/ColorModeContext';

interface CustomProps {
  children?: ReactNode;
  content: ExerciseNormalised;
}

export default function ExerciseContentBlock({ content }: CustomProps) {
  const { id } = content;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const { toggleModal } = useModalContext();
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();

  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  const [expanded, setExpanded] = useState(false);

  useEffect(() => setExpanded(false), [edit]);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const exerciseLastUpdated = content.exerciseResults?.[0]?.resultDate
    ? content.exerciseResults[0].resultDate
    : null;

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
            {exerciseLastUpdated && (
              <Typography variant='body2' color='text.secondary'>
                result updated {daysAgo(exerciseLastUpdated)}
              </Typography>
            )}
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
            <ContentBlockMenu mode='exercise' content={content} />
          ) : (
            <>
              {content.exerciseType && content.exerciseType != 'no type' && (
                <Chip label={content.exerciseType} color='secondary' />
              )}
              <ExpandMoreBtn
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='expand exercise information button'
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
            padding: '0px',
          }}
        >
          <Typography variant='body1' mb={1} ml={2}>
            {content?.description}
          </Typography>
          <Stack
            direction={'row'}
            ml={2}
            mb={1}
            spacing={3}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            {content.exerciseExternalLinks?.map((el, i) => {
              return (
                <Link
                  color={checkIfDark ? 'primary' : 'secondary'}
                  key={`external-link-${i}`}
                  rel='noopener'
                  underline='hover'
                  target='_blank'
                  href={el.href}
                >
                  {el.label}
                </Link>
              );
            })}
          </Stack>

          <Divider />
          <PreviousTrainingSwitcher content={content} />
          {content.exerciseResults?.length ? (
            <ExerciseTable results={content.exerciseResults} />
          ) : (
            <Alert
              variant='outlined'
              severity='info'
              sx={{ margin: '1rem 1rem 0rem 1rem' }}
            >
              No results recorded yet...
            </Alert>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0.5rem 1rem 1rem 1rem',
          }}
        >
          <DynamicColorBtn
            size='small'
            variant='text'
            onClick={() => toggleModal('result', 'manageList', content)}
          >
            manage existing results
          </DynamicColorBtn>
          <Button
            size='small'
            variant='contained'
            onClick={() => toggleModal('result', 'create', content)}
          >
            Add result
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
