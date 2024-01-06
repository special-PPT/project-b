import React from "react";
import "./App.css";
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
// import CreatePage from "./components/auth/createAccPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/employee/dashboard/layout";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<DashboardLayout />} />
          {/* You can add more routes here if needed */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
