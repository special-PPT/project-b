import { Button, Container, Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import OnBoardingSteper from './OnBoardingSteper'
import EmergencyContact from './EmergencyContact'
import Reference from './Reference'
import BasicInfo from './BasicInfo'
import Summary from './Summary'
import axios from 'axios'
import { UserProvider } from './UserContext'
import { UserContext } from './UserContext';

function OnboardingContent(step: number) {
    switch(step){
        case 0:
            return <BasicInfo />
        case 1:
            return <Reference />
        case 2:
            return <EmergencyContact />
        default:
            return <Summary />
    }
    
}

export default function OnboardingLayout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { userInfo, setUserInfo, handleChange } = useContext(UserContext);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }
  const handleBack = () => {
      setActiveStep(activeStep - 1);
  }
  const userID = "65af03d70b1107824b6b511c"
  const handleSubmit = () =>{
        console.log(userInfo);
  }
  return (
    <UserProvider>
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <OnBoardingSteper activeStep={activeStep} setActiveStep={setActiveStep} />
                </Grid> 
                <Grid item xs={12} md={8}>
                    {OnboardingContent(activeStep)}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={activeStep === 3? 12 : 6}>
                            <Button variant="outlined" color="primary" onClick={handleBack}
                            fullWidth
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {
                                activeStep === 3 ? null :
                                <Button variant="contained" color="primary" onClick={handleNext}
                                fullWidth
                                >
                                    Save
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </UserProvider>
  )
}
