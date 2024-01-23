import { Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store';
export default function Summary() {
    const user = useSelector((state: RootState) => state.user);
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
                    {user.firstName} ({user.middleName}) {user.lastName} 
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {user.address.building} {user.address.street} {user.address.city}, {user.address.state}, {user.address.zip}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper elevation={3}>
                <Typography variant="h4" component="h3" gutterBottom>
                    Contact Information
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    CellPhone: {user.phoneNumbers.cell}
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                    HomePhone: {user.phoneNumbers.work}
                </Typography>
            </Paper>
        </Grid>
    </Container>
  )
}
