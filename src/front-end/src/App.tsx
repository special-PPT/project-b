import React from 'react';
import './App.css';
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import CreatePage from './components/auth/createAccPage';
import BasicInfo from './components/onboard/basicInfo';
import Reference from './components/onboard/reference';
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <BasicInfo/> */}
      <Reference/>
    </ThemeProvider>
  );
}

export default App;
