import { useState } from "react";
import { SideNav } from "./sideNav";
import TopNav from "./topNav";
import { styled } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import EmployeeHome from "../EmployeeHome";
import EmployeeProfile from "../EmployeeProfile";
import EmployeeVisaManagement from "../EmployeeVisaManagement";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export default function DashboardLayout() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <Routes>
            <Route path="/" element={<EmployeeHome />} />
            <Route path="/profile" element={<EmployeeProfile />} />
            <Route
              path="/visa-management"
              element={<EmployeeVisaManagement />}
            />
            {/* Additional routes as needed */}
          </Routes>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}
