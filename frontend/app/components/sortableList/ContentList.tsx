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
import ContentBlock from '../ContentBlock';
import { useEffect, useRef, useState, useTransition } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { changeContentPosition } from '@/app/lib/changeContentPosition';
import { useOptimisticContext } from '@/app/context/OptimisticLoadingContext';
import { transformToContentArray } from '@/app/utils/transformToContent';

interface CustomProps {
  data: Workout[] | Day[] | Exercise[];
  cookie: string;
  userId: string;
  mode: Entity;
}

export default function ContentList({
  data,
  cookie,
  userId,
  mode,
}: CustomProps) {
  const [sortedData, setSortedData] = useState<Content[]>([]);
  const { updateOptimisticData, optimisticData } = useOptimisticContext();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function sortByPosition(arr: Content[]) {
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
    const formattedData = sortByPosition(optimisticData);
    setSortedData(formattedData);
  }, [optimisticData]);

  useEffect(() => {
    if (optimisticData.length > data.length) return;

    const formattedData = sortByPosition(transformToContentArray(data));

    setSortedData(formattedData);
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
      setSortedData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => {
          return item.id === over.id;
        });
        const newSortedData = arrayMove(items, oldIndex, newIndex);
        newPositions = newSortedData.map((el, i) => ({
          id: el.id,
          position: i,
        }));
        return newSortedData;
      });

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer
      timerRef.current = setTimeout(() => {
        startTransition(async () => {
          try {
            await changeContentPosition(newPositions, cookie, userId);
          } catch (error) {
            throw new Error(`Error updating positions: ${error}`);
          }
        });
      }, 700);
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={sortedData.map((el) => el.id)}>
        <Stack mt={4} mb={{ xs: 3, sm: 5 }} spacing={2}>
          {sortedData?.map((el) => (
            <ContentBlock key={el.id} content={el} mode={mode} />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
