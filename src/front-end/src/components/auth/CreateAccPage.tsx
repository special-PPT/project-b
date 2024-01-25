import { Box, Button, Container, Grid, IconButton, InputAdornment, Link, OutlinedInput, TextField, Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { set } from 'mongoose';

export default function CreatePage() {
  const token = useParams<{token: string}>();
  const navigate = useNavigate();
  interface LoginData{
    username: string,
    email: string,
    password: string
  }
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setLoginData({ ...loginData, [id]: value });
    console.log(loginData);
  }
  const verifyToken = async () => {
    await axios.get(`http://localhost:8000/verify/${token.token}`)
    .then(res => {
      // setLoginData({username: res.data.user.username, email: res.data.user.email, password: res.data.user.password});
      console.log(res.data.user);
      setLoginData({username: res.data.user.username, email: res.data.user.email, password: res.data.user.password});
      console.log(loginData);
    })
    .catch(err => {
      // navigate('/login');
      alert(err)
      console.log(err);
    });
    // const resp = await fetch(`http://localhost:8000/verify/${token.token}`,
    // {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // });
    // if(resp.status === 200){
    //   const data = await resp.json();
    //   setLoginData({username: data.user.username, email: data.user.email, password: data.user.password});
    // }
    // else{
    //   alert('Invalid token!');
    // }
  }
  const handleSignup = async () => {
    // await axios.post('http://localhost:8000/user/register', loginData)
    // .then(res => {
    //   console.log(res.data);
    //   alert('Account created successfully!');
    //   navigate('/onboarding');
    // })
    // .catch(err => {
    //   alert('Account creation failed!');
    //   console.log(err);
    // });
    const resp = await fetch('http://localhost:8000/user/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData)
    });
    if(resp.ok){
      alert('Account created successfully!');
      navigate('/onboarding');
    }else{
      alert('Account creation failed!');
    }
  }
  useEffect(() => {
    verifyToken();
  } ,[token.token])
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
          Create Account
        </Typography>
        <Typography variant='caption' display={'block'} gutterBottom>
          Please fill out this form with the required information
        </Typography>
        <Box sx={{ width: '100%', mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <span>Username</span>
              <OutlinedInput
                disabled
                required
                fullWidth
                id="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <span>Email</span>
              <OutlinedInput
                disabled
                required
                fullWidth
                id="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <span>Password</span>
              <TextField
                required
                fullWidth
                disabled
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginData.password}
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
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary"
                // sx={{borderRadius: '20px'}}
                onClick={handleSignup}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          </Box>
      </Box>   
    </Container> 
  )
}
