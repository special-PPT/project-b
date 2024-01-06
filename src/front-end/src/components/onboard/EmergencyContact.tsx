import { Button, Container, Divider, Grid } from '@mui/material'
import React, { Fragment, useState } from 'react'
import PersonInfo from './Personinfo';

export default function EmergencyContact() {
    const [contactNumber, setContactNumber] = useState<number>(1);
  return (
    <Container>
        <Grid container spacing={3}>
            {
                Array.from(Array(contactNumber).keys()).map((item, index) => (
                    <Fragment key={index}>
                        <Grid item xs={12} key={index}>
                            <PersonInfo tableName={`Emergency Contact ${item + 1}`}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                    </Fragment>
                ))
            }
            <Grid item xs={12}>
                <Button 
                    fullWidth
                    variant="contained" color="primary" onClick={() => setContactNumber(contactNumber + 1)}
                >
                    Add Emergency Contact
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button variant="outlined" color="primary" fullWidth>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth>
                    Save
                </Button>
            </Grid>                
        </Grid>
    </Container>
  )
}
