import React from 'react';
import './App.css';
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import CreatePage from './components/auth/createAccPage';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CreatePage />
    </ThemeProvider>
  );
}

export default App;
