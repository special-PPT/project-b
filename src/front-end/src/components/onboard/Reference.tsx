import { Button, Container, Divider, Grid } from '@mui/material'
import React from 'react'
import PersonInfo from './Personinfo'

export default function Reference() {
  return (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <PersonInfo tableName="Reference"/>
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
