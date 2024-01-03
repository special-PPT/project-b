import { Box, Button, Container, Divider, Grid, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import theme from '../../theme'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function BasicInfo() {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isFreetoWork, setIsFreetoWork] = React.useState<string>('');
    const [isOPT, setIsOPT] = React.useState<boolean>(false);
    const handleOPTChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        if (value === 'opt') {
            setIsOPT(true);
        } else {
            setIsOPT(false);
        }
    }   
    const handleFreetoWorkChange = (event: SelectChangeEvent<string>) => {
        setIsFreetoWork(event.target.value);
    }
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
                   <Paper
                    elevation={3}
                    sx={{
                        display: 'inline-flex', // 使用内联flex布局
                        justifyContent: 'center', // 水平居中
                        alignItems: 'center', // 垂直居中
                        width: 'fit-content', // 宽度根据内容调整
                        height: 'fit-content', // 高度根据内容调整
                        padding: '0px', // 去除内边距
                        margin: '0px', // 去除外边距
                    }}
                   >
                    <img 
                    style={{
                        maxWidth: isMobile? '60vw': '20vw', 
                        height: 'auto', // 高度自动
                    }}
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/ghost-and-pumpkin-background-design-template-226db258785cb1efaeeb18ce9d815657_screen.jpg?ts=1697877076" alt="profile pic"/>  
                   </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Upload Image
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Leagal Name
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
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                <span>Middle Name</span>
                    <OutlinedInput
                        required
                        fullWidth
                        id="middleName"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Address
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Address Line 1&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="streetAddress"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Address Line 2&nbsp;
                    </Typography>
                    <OutlinedInput
                        fullWidth
                        id="streetAddress2"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        City&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="city"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        State&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="state"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Zip Code&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="zipCode"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Email Address
                    </Typography>
                {/* </Grid>
                <Grid item xs={12}> */}
                    <Typography variant="body1" component="span">
                        example@example.com
                    </Typography>
                </Grid>  
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Phone
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Type&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="phoneType"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Number&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="phoneNumber"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid  item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Phone Extention
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="phoneExtention"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Identification Information
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Social Security Number&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    <OutlinedInput
                        required
                        fullWidth
                        id="ssn"
                        // placeholder="Last Name"
                        // onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{width:'100%'}}>
                    <Typography variant="body1" component="span">
                        Date of Birth&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                        </Typography>
                    </Typography>
                    </Box>
                    <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        sx={{width:'100%'}}
                        />
                    </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                        Gender&nbsp;
                    </Typography>

                    <Select
                        id='gender'
                        sx={{
                            width: '100%',
                        }}
                    >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"dontwish"}>I do not wish to answer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Verification
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                    Permanent resident or citizen of the U.S.?&nbsp;
                    <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                            *
                    </Typography>
                    </Typography>
                    <Select
                        id='freetowork'
                        sx={{
                            width: '100%',
                        }}
                        value={isFreetoWork}
                        onChange={handleFreetoWorkChange}
                    >
                        <MenuItem value={"yes"}>Yes</MenuItem>
                        <MenuItem value={"no"}>No</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    {isFreetoWork === 'yes' &&
                        <Box>
                            <Typography variant="body1" component="span">
                            What is your status?&nbsp;
                            <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                    *
                            </Typography>
                            </Typography>
                            <Select
                                id='citizen'
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <MenuItem value={"citizen"}>Citizen</MenuItem>
                                <MenuItem value={"resident"}>Permit Resident</MenuItem>
                            </Select>
                        </Box>
                        
                    }
                    {
                        isFreetoWork === 'no' &&
                        <Box>
                            <Typography variant="body1" component="span">
                            What is your status?&nbsp;
                            <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                    *
                            </Typography>
                            </Typography>
                            <Select
                                id='visa'
                                sx={{
                                    width: '100%',
                                }}
                                onChange={handleOPTChange}
                            >
                                <MenuItem value={"opt"}>OPT</MenuItem>
                                <MenuItem value={"h1b"}>H1b</MenuItem>
                            </Select>
                        </Box>
                    }
                    {
                        isOPT &&
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="span">
                                OPT Receipt&nbsp;
                                <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                        *
                                </Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" component="span">
                                    One file max size 10 MB (PDF, jpg, png, jpeg)
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Button variant="outlined" color="primary">
                                Select File
                            </Button>
                            </Grid>
                        </Grid>
                    }
                    {
                        isFreetoWork === 'no' &&
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="span">
                                Visa Title&nbsp;
                                <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                        *
                                </Typography>
                                </Typography>
                                <Select
                                    id='visaType'
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <MenuItem value={"h1"}>H1</MenuItem>
                                    <MenuItem value={"f1"}>F1</MenuItem>
                                    <MenuItem value={"j1"}>J1</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="span">
                                Start Date&nbsp;
                                <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                        *
                                </Typography>
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    sx={{width:'100%'}}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="span">
                                End Date&nbsp;
                                <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                        *
                                </Typography>
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    sx={{width:'100%'}}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Other
                    </Typography>
                </Grid>
                {/* Driver License */}
                <Grid item xs={12}>
                    <Typography variant="body1" component="span">
                    Driver License&nbsp;
                        <Typography variant="body1" component="span" color="error" sx={{ verticalAlign: 'super' }}>
                                *
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" component="span">
                        One file max size 10 MB (PDF, jpg, png, jpeg)
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary">
                        Select File
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    sx={{
                        width: '15%',
                    }}
                    variant="contained" color="primary" >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Container>
  )
}
