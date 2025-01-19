'use client';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Stack } from '@mui/material';
import ContentBlock from '../ContentBlock/ContentBlock';
import { useEffect, useRef, useTransition } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { changeContentPosition } from '@/app/lib/changeContentPosition';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import { transformToContentArray } from '@/app/utils/transformToContent';
import areArraysEqualUnordered from '@/app/utils/areArraysEqualUnordered';
import ExerciseContentBlock from '../ContentBlock/EcerciseContentBlock';
import { DRAG_AND_DROP_QUERY_DELAY } from '@/app/config/config';

interface CustomProps {
  data: Workout[] | Day[] | Exercise[];
  cookie: string;
  mode: Entity;
}

export default function ContentList({ data, cookie, mode }: CustomProps) {
  const { updateOptimisticData, optimisticData } = useOptimisticContext();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function sortByPosition(arr: Content[] | ExerciseNormalised[]) {
    const sortedArr = [...arr].sort((a, b) => {
      if (a.position === b.position) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      }
      return a.position - b.position;
    });
    return sortedArr;
  }

  useEffect(() => {
    if (areArraysEqualUnordered(optimisticData, data)) return;

    const formattedData = sortByPosition(transformToContentArray(data));

    updateOptimisticData(formattedData);
  }, [data]);

  const [isPending, startTransition] = useTransition();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    let newPositions: {
      id: string;
      position: number;
    }[];

    if (over && active.id !== over.id) {
      const oldIndex = optimisticData.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = optimisticData.findIndex((item) => item.id === over.id);

      const newOptimisticData = arrayMove(
        optimisticData,
        oldIndex,
        newIndex
      ).map((el, i) => ({
        ...el,
        position: i,
      }));

      newPositions = newOptimisticData.map((el, i) => ({
        id: el.id,
        position: i,
      }));

      // Update the optimistic data in your context
      updateOptimisticData(newOptimisticData);

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer
      timerRef.current = setTimeout(() => {
        startTransition(async () => {
          try {
            await changeContentPosition(newPositions, cookie, mode);
          } catch (error) {
            throw new Error(`Error updating positions: ${error}`);
          }
        });
      }, DRAG_AND_DROP_QUERY_DELAY);
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={optimisticData.map((el) => el.id)}>
        <Stack
          mt={4}
          mb={{ xs: 3, sm: 5 }}
          spacing={2}
          sx={{ maxWidth: '40rem' }}
        >
          {optimisticData?.map((el) =>
            mode === 'exercise' ? (
              <ExerciseContentBlock
                key={el.id}
                content={el as ExerciseNormalised}
              />
            ) : (
              <ContentBlock key={el.id} content={el} mode={mode} />
            )
          )}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
