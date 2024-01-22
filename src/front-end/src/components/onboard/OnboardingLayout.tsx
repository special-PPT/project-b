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
  const userID = "65adb80fe7e982f9b419d6c7"
  const handleSubmit = async () => {
    const resp = await axios.put(`http://localhost:8000/personalInfo/update/${userID}`, userInfo)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    }
    )
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
                    <Button variant="outlined" color="primary" onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}
                    fullWidth
                    >
                        Submit
                    </Button>
                </Grid>
                
                
            </Grid>
        </Container>
    </UserProvider>
  )
}
