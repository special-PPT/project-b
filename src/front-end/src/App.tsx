import React from 'react';
import './App.css';
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import PersonInfo from './components/onboard/personinfo';
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <BasicInfo/> */}
      <PersonInfo tableName="Person Info"/>
    </ThemeProvider>
  );
}

export default App;
