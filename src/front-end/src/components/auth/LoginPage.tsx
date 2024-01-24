import { Box, Button, Container, Grid, IconButton, InputAdornment, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import axios from 'axios';



export default function LoginPage() {


  const navigate = useNavigate();

  interface LoginData{
    username: string,
    password: string
  }
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [hashedData, setHashedData] = useState<LoginData>({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setLoginData({ ...loginData, [id]: value });
    // console.log(loginData);
  }
  // const handleLogin = () => {
  //   // console.log(loginData);
  //   // SHA256
  //   const hashedPasswd = CryptoJS.SHA256(loginData.password).toString();
  //   setHashedData({username: loginData.username, password: loginData.password});
  //   // console.log(hashedData);
  //   axios.post('http://localhost:8000/user/login', hashedData)
  //   .then(res => {
  //     console.log(res.data);
  //     // navigate('/employee/home');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }

  const handleLogin = async () => {

    // const hashedPasswd = CryptoJS.SHA256(loginData.password).toString();
    const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Needed to include cookies in the request
        body: JSON.stringify({username: loginData.username, password: loginData.password}),
    });

    if (response.ok) {
      const data = await response.json(); // Parse JSON response
      console.log("Login successful");
      console.log(data);
  
      // Redirect based on the role
      if (data.user.role === 'HR') {
        navigate('/hr/home'); // Navigate to HR page
      } else if (data.user.role === 'Employee') {
        navigate('/employee/home'); // Navigate to Employee page
      } else {
        // Handle other roles or lack thereof
        console.error('Unknown role or no role provided');
      }
    } else {
      // Handle login error
      console.error("Login failed");
    }
}

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant='caption' display={'block'} gutterBottom>
          Please enter your username and password
        </Typography>
        <Box sx={{ width: '100%', mt: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <span>Username</span>
              <OutlinedInput
                required
                fullWidth
                id="username"
                placeholder="Username"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <span>Password</span>
              <TextField
                required
                fullWidth
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href="/register" variant="body2">
                Signup
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/forgot-password" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary"
                sx={{borderRadius: '20px'}}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
          </Box>
      </Box>   
    </Container> 
  )
}
