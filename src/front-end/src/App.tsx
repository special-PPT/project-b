import React, { useEffect } from 'react';
import { useDispatch } from './redux/hooks/useDispatch';
import { fetchEmployeeProfiles } from './redux/features/hr/hrSlice';
import "./App.css";
// import LoginPage from './components/auth/loginPage';
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
// import PersonInfo from "./components/onboard/Personinfo";
// import Reference from "./components/onboard/Reference";
// import EmergencyContact from "./components/onboard/EmergencyContact";
// import Footer from "./components/common/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/employee/dashboard/layout";
import EmployeeHome from "./components/employee/EmployeeHome";
import EmployeeProfile from "./components/employee/EmployeeProfile";
import EmployeeVisaManagement from "./components/employee/EmployeeVisaManagement";
import HrEmployeeProfiles from "./components/hr/profile/HrEmployeeProfiles";
import OnboardingLayout from "./components/onboard/OnboardingLayout";
import AuthLayout from "./components/auth/AuthLayout";
import ProfileScreen from "./components/hr/profile/ProfileScreen";
import HrVisaManagement from "./components/hr/visa/HrVisaManagement";
import HrHiringManagement from "./components/hr/hiring/HrHiringManagement";
import HrEmployeeApplication from "./components/hr/hiring/HrEmployeeApplication";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import RouteProtector from './components/auth/RouteProtector';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeeProfiles());
  }, [dispatch]);

  return (
    //   <ThemeProvider theme={theme}>
    //     <OnBoardingSteper />
    //     {/* <EmergencyContact />
    // <Footer /> */}
    //   </ThemeProvider>
    // <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<AuthLayout content="login"/>} />
            <Route path="/signup/:token" element={<AuthLayout content=""/>} />
            {/* Onboarding routes */}
            <Route path="/onboarding" element={<OnboardingLayout />} />
            {/* Employee routes */}
            <Route
              path="/employee/home"
              element={
                <RouteProtector allowedRoles={['Employee']}>
                  <DashboardLayout role="employee">
                    <EmployeeHome />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <RouteProtector allowedRoles={['Employee']}>
                  <DashboardLayout role="employee">
                    <EmployeeProfile />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/employee/visa-management"
              element={
                <RouteProtector allowedRoles={['Employee']}>
                  <RouteProtector allowedRoles={['Employee']}>
                    <DashboardLayout role="employee">
                      <EmployeeVisaManagement />
                    </DashboardLayout>
                  </RouteProtector>
                </RouteProtector>
              }
            />

            {/* HR routes */}
            <Route
              path="/hr/home"
              element={
                <RouteProtector allowedRoles={['HR']}>
                  <DashboardLayout role="hr">
                    <HrEmployeeProfiles />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/hr/employee-profiles"
              element={
                <RouteProtector allowedRoles={['HR']}>
                  <DashboardLayout role="hr">
                    <HrEmployeeProfiles />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/hr/visa-management"
              element={
                <RouteProtector allowedRoles={['HR']}>
                  <DashboardLayout role="hr">
                    <HrVisaManagement />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/hr/hiring-management"
              element={
                <RouteProtector allowedRoles={['HR']}>
                  <DashboardLayout role="hr">
                    <HrHiringManagement />
                  </DashboardLayout>
                </RouteProtector>
              }
            />
            <Route
              path="/hr/employee-profile/:employeeId"
              element={
              <RouteProtector allowedRoles={['HR']}>
                <ProfileScreen />
              </RouteProtector>
              }
            />
            <Route
              path="/hr/employee-application/:employeeId"
              element={
              <RouteProtector allowedRoles={['HR']}>
                <HrEmployeeApplication />
              </RouteProtector>
              }
            />

            {/* Other Routes */}
          </Routes>
        </ThemeProvider>
      </Router>
    // </Provider>
  );
}

export default App;
