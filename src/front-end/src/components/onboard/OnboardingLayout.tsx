import { Button, Container, Grid } from '@mui/material'
import React from 'react'
import OnBoardingSteper from './OnBoardingSteper'
import EmergencyContact from './EmergencyContact'
import Reference from './Reference'
import BasicInfo from './BasicInfo'


function OnboardingContent(step: number) {
    switch(step){
        case 0:
            return <BasicInfo />
        case 1:
            return <Reference />
        case 2:
            return <EmergencyContact />
        default:
            throw new Error('Unknown step')
    }
    
}

export default function OnboardingLayout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }
  const handleBack = () => {
      setActiveStep(activeStep - 1);
  }
  return (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <OnBoardingSteper activeStep={activeStep} setActiveStep={setActiveStep} />
            </Grid> 
            <Grid item xs={12} md={8}>
                {OnboardingContent(activeStep)}
                <Button variant="outlined" color="primary" onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    Save
                </Button>
            </Grid>
        </Grid>
    </Container>
  )
}
