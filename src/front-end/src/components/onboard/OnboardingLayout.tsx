import { Button, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import OnBoardingSteper from './OnBoardingSteper'
import EmergencyContact from './EmergencyContact'
import Reference from './Reference'
import BasicInfo from './BasicInfo'
import Summary from './Summary'
import axios from 'axios'


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
    interface BasicInfoData{
        firstName: string,
        lastName: string,
        middleName: string,
        preferredName: string,
        profilePicture: string,
        address: {
            building: string,
            street: string,
            city: string,
            state: string,
            zip: string,
        },
        phoneNumbers: {
            cell: string,
            work: string,
        },
        dateOfBirth: Date,
        gender: string,
        emergencyContacts: [],
        workAuthorization: string,
        // documents: [],
    }
    const [userInfo, setUserInfo] = React.useState<BasicInfoData>({
        firstName: 'Zhengmao',
        lastName: 'Zhang',
        middleName: 'Malker',
        preferredName: '',
        profilePicture: '',
        address: {
            building: '5692 SW',
            street: '',
            city: 'Beaverton',
            state: 'OR',
            zip: '97201',
        },
        phoneNumbers: {
            cell: '9717548117',
            work: '',
        },
        dateOfBirth: new Date(),
        gender: 'male',
        emergencyContacts: [],
        workAuthorization: '',
    });
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }
  const handleBack = () => {
      setActiveStep(activeStep - 1);
  }
  const userID = "65ac512a16b08c4a80c9b73f"
  const handleSubmit = async () => {
    const resp = await axios.post(`http://localhost:8000/personalInfo/update/${userID}`, userInfo)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    }
    )
  }
    useEffect(() => {
        handleSubmit();
    }
  )
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
