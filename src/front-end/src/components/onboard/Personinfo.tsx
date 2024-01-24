import { Box, Button, Container, Grid, OutlinedInput, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserContext';

type PersonProps = {
  tableName: string,
  index?: number,
};
const PersonInfo: React.FC<PersonProps> = ({ tableName, index }) => {
    const [dbname, setDbname] = React.useState('reference');
    const { userInfo, setUserInfo, handleChange } = useContext(UserContext);
    useEffect(() => {
        if(tableName === "Reference"){
            setDbname('reference')
        }else if(tableName.includes("Emergency Contact")){
            setDbname(`emergencyContacts.${index}`)
        }
    }
    , [tableName]);

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
                        {tableName} {index? index + 1 : null}
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
                        id={dbname + ".firstName"}
                        onChange={handleChange}
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
                        id={dbname + ".lastName"}
                        onChange={handleChange}
                    />
                </Grid>
                
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
                        id={dbname + ".phone"}
                        onChange={handleChange}
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
                        id={dbname + ".email"}
                        onChange={handleChange}
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
                        id={dbname + ".relationship"}
                        onChange={handleChange}
                    />
                  </Grid>
            </Grid>  
        </Box>
    </Container>
  )
}

export default PersonInfo;
