import { useState } from "react";
import { SideNav } from "./sideNav";
import TopNav from "./topNav";
import { styled } from "@mui/material/styles";
import React, { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

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

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
        {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}
