import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { UserContext } from './UserContext';
export default function Summary() {
    // const user = useSelector((state: RootState) => state.user);
    const {userInfo} = useContext(UserContext);
    const handleSumbit = () =>{
        
    }
  return (
    <Container>
        <Grid item xs={12}>
            <Typography variant="h3" component="h1" gutterBottom>
                Summary
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Paper elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom>
                    Basic Information
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    {userInfo.firstName} {userInfo.middleName === ""? (userInfo.middleName): null} {userInfo.lastName} {userInfo.gender}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {userInfo.address.street} {userInfo.address.building}, {userInfo.address.city}, {userInfo.address.state}, {userInfo.address.zip}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom>
                    Contact Information
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    Phone Number: {userInfo.phoneNumbers.cell} &nbsp; {userInfo.phoneNumbers.work}
                </Typography>
            </Paper>
        </Grid>
        {   userInfo.reference &&
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Reference
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        {userInfo.reference.firstName} {userInfo.reference.middleName === ""? (userInfo.reference.middleName): null} {userInfo.reference.lastName} 
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {userInfo.reference.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {userInfo.reference.phone}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {userInfo.reference.relationship}
                    </Typography>
                </Paper>
            </Grid>
        }
        
        <Grid item xs={12}>
            <Paper elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom>
                    Work Authorization
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    {userInfo.workAuthorization}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Button variant='contained' color='primary'
                fullWidth
                
            >
                Submit
            </Button>
        </Grid>
    </Container>
  )
}
