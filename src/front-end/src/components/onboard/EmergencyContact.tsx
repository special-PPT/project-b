import { Button, Container, Divider, Grid } from '@mui/material'
import React, { Fragment, useContext, useState } from 'react'
import PersonInfo from './Personinfo';

export default function EmergencyContact() {
    const [contactNumber, setContactNumber] = useState<number>(1);
    // const { userInfo, setUserInfo, handleChange } = useContext(UserContext);
  return (
    <Container>
        <Grid container spacing={3}>
            {
                Array.from(Array(contactNumber).keys()).map((item, index) => (
                    <Fragment key={index}>
                        <Grid item xs={12} key={index}>
                            <PersonInfo tableName={`Emergency Contact`} index={index} />
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
        </Grid>
    </Container>
  )
}
