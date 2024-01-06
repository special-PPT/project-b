import { Box, Button, Container, Grid, OutlinedInput, Typography } from '@mui/material'
import React from 'react'

type PersonProps = {
  tableName: string;
};
const PersonInfo: React.FC<PersonProps> = ({ tableName }) => {
  return (
    <Container>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        {tableName}
                    </Typography>
              </Grid>
              <Grid item xs={12}
                >
                    <Typography variant="body1" component="span">
                        First Name&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="firstName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Last Name&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="lastName"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Middle Name
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="middleName"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                {/* Phone Number Required** */}
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Phone Number&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="phoneNumber"
                    />
                  </Grid>
                  {/* Email Required** */}
                  <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Email&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="email"
                    />
                  </Grid>
                  {/* Relationship Required** */}
                  <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Relationship&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="relationship"
                    />
                  </Grid>
            </Grid>  
        </Box>
    </Container>
  )
}

export default PersonInfo;
