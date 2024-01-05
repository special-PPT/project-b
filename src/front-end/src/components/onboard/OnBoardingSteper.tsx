import React, { useState } from 'react'
import theme from '../../theme'
import { Button, Container, Grid, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';
import BasicInfo from './BasicInfo';
import Reference from './Reference';
import EmergencyContact from './EmergencyContact';
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <BasicInfo />;
    case 1:
      return <Reference />;
    case 2:
      return <EmergencyContact />;
    default:
      throw new Error('Unknown step');
  }
}


export default function OnBoardingSteper() {
  const steps = ['Basic Infomation', 'Reference', 'Emergency Contact', 'Upload Documents'];
  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
      setActiveStep(activeStep - 1);
  }
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button fullWidth disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleNext}>Next</Button>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel={isMobile} orientation={isMobile? 'horizontal': 'vertical'}
          >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
      
      
    </Container>
  )
}
