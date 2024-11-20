import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import SubmitButton from '../UI/SubmitButton';
import { DialogTitle } from '@mui/material';
import { useModalContext } from '@/app/context/ModalContext';
import ExerciseFirstStep from './ExerciseFirstStep';
import ExerciseSecondStep from './ExerciseSecondStep';

const steps = [
  {
    label: 'Add exercise Information',
  },

  {
    label: 'Add exercise to existing workouts',
  },
];

export default function ExerciseModal() {
  const { mode, toggleModal } = useModalContext();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <DialogTitle>
        {`${mode.operation}
        ${mode.entity}`}
      </DialogTitle>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {index === 0 && <ExerciseFirstStep mode={mode} />}
              {index === 1 && <ExerciseSecondStep mode={mode} />}
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 ? (
                    <SubmitButton>Submit</SubmitButton>
                  ) : (
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  )}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
