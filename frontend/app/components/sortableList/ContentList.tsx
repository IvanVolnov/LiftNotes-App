'use client';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Stack } from '@mui/material';
import ContentBlock from '../ContentBlock';
import { Workout } from '@/app/account/workouts/page';
import { useState } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface CustomProps {
  data: Workout[];
}

export default function ContentList({ data }: CustomProps) {
  const [sortedData, setSortedData] = useState<Workout[]>(data);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSortedData((items) => {
        const oldIndex = items.findIndex(
          (item) => item.workout_id === active.id
        );
        const newIndex = items.findIndex((item) => item.workout_id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    console.log(active, over);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
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
