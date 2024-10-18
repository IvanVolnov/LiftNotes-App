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
import { Workout } from '@/app/account/workouts/page';
import { useState, useTransition } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { changeContentPosition } from '@/app/lib/changeContentPosition';

interface CustomProps {
  data: Workout[];
}

export default function ContentList({ data }: CustomProps) {
  const [sortedData, setSortedData] = useState<Workout[]>(
    [...data].sort((a, b) => {
      if (a.position === b.position) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        const timeA = dateA.getTime();
        const timeB = dateB.getTime();

        return timeB - timeA;
      }
      return a.position - b.position;
    })
  );
  const [isPending, startTransition] = useTransition();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSortedData((items) => {
        const oldIndex = items.findIndex(
          (item) => item.workout_id === active.id
        );
        const newIndex = items.findIndex((item) => item.workout_id === over.id);
        const newSortedData = arrayMove(items, oldIndex, newIndex);
        const newPositions = newSortedData.map((el, i) => ({
          id: el.workout_id,
          position: i,
        }));

        // Use startTransition to mark the update as non-urgent
        startTransition(async () => {
          try {
            await changeContentPosition(newPositions);
          } catch (error) {
            // Optionally handle errors, e.g., revert state or show a notification
            console.error('Error updating positions:', error);
          }
        });
        return newSortedData;
      });
    }
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={sortedData.map((workout) => workout.workout_id)}>
        <Stack mt={4} mb={{ xs: 3, sm: 5 }} spacing={2}>
          {sortedData?.map((workout) => (
            <ContentBlock
              key={workout.workout_id}
              id={workout.workout_id}
              header={workout.workout_name}
              text={workout.workout_description}
              mode='workout'
            />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
