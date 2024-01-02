import React from 'react';
import './App.css';
import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
        <LoginPage />
    </ThemeProvider>
  );
}

export default App;
