import React from 'react';
import './App.css';
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import PersonInfo from './components/onboard/Personinfo';
import Reference from './components/onboard/Reference';
import EmergencyContact from './components/onboard/EmergencyContact';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <EmergencyContact />
    </ThemeProvider>
  );
}

export default App;
