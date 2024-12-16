import { setPrevExercise } from '@/app/lib/exercisesActions';
import { Stack, Switch, Typography } from '@mui/material';
import { useState } from 'react';

interface CustomProps {
  content: ExerciseNormalised;
}

export default function PreviousTrainingSwitcher({ content }: CustomProps) {
  const [switchValue, setSwitchValue] = useState(
    content.previousTrainingWasEasy
  );

  function handleSwitcher() {
    const newValue = !switchValue;
    setSwitchValue(newValue);
    setPrevExercise(content.id, newValue);
  }

  return (
    <Stack direction='row' spacing={3} alignItems='center' ml={2}>
      <Typography variant='body1'>how the training was?</Typography>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography variant='body2'>normal</Typography>
        <Switch checked={switchValue} onClick={handleSwitcher} />
        <Typography variant='body2'>easy</Typography>
      </Stack>
    </Stack>
  );
}
