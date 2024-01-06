import React from 'react';
import './App.css';
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import PersonInfo from './components/onboard/Personinfo';
import Reference from './components/onboard/Reference';
import EmergencyContact from './components/onboard/EmergencyContact';
import Footer from './components/common/Footer';
import OnBoardingSteper from './components/onboard/OnBoardingSteper';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <OnBoardingSteper />
      {/* <EmergencyContact />
      <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
