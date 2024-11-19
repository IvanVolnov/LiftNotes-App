// 'use client';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import SubmitButton from '../UI/SubmitButton';
// import { useModalContext } from '@/app/context/ModalContext';
// import {
//   FormControlLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
// } from '@mui/material';

// export default function ExerciseModal() {
//   const { mode, toggleModal } = useModalContext();

//   const handleClose = () => {
//     toggleModal();
//   };

//   return (
//     <>
//       <DialogTitle>
//         {`${mode.operation}
//         ${mode.entity}`}
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           required
//           margin='dense'
//           id='name'
//           name='name'
//           label='Name'
//           type='text'
//           fullWidth
//           variant='standard'
//           color='primary'
//           defaultValue={mode.modeData?.name}
//         />
//         <TextField
//           autoFocus
//           margin='dense'
//           id='description'
//           name='description'
//           label='Description'
//           type='text'
//           fullWidth
//           variant='standard'
//           defaultValue={mode.modeData?.description}
//         />
//         <RadioGroup
//           aria-labelledby='demo-radio-buttons-group-label'
//           defaultValue='female'
//           name='radio-buttons-group'
//         >
//           <FormControlLabel
//             value='compound'
//             control={<Radio />}
//             label='compound'
//           />
//           <FormControlLabel value='cardio' control={<Radio />} label='cardio' />
//           <FormControlLabel
//             value='isolation'
//             control={<Radio />}
//             label='isolation'
//           />
//           <FormControlLabel
//             value='stretching'
//             control={<Radio />}
//             label='stretching'
//           />
//         </RadioGroup>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <SubmitButton>Submit</SubmitButton>
//       </DialogActions>
//     </>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function ExerciseModal() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant='caption'>Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
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
