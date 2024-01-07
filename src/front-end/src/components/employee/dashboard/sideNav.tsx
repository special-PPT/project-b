import { useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  Stack,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Logo } from "../../common/logo";
import { employeeItems } from "../EmployeeSideNavItems";
import { SideNavItem } from "./sideNavItem";
import { hrItems } from "../../hr/HrSideNavItems";

interface SideNavProps {
  open: boolean;
  onClose: () => void;
  role: string;
}

export const SideNav: React.FC<SideNavProps> = ({ open, onClose, role }) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const location = useLocation();
  const pathname = location.pathname;

  // determine which items to use based on role
  const items = role === "employee" ? employeeItems : hrItems;

  const content = (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          m: 2
        }}
      >
        <Box
        sx={{m: 2}}>
          <Logo />
        </Box>

        <Box
          component="nav"
          sx={{
            m: 2
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 2,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#3a4d8f",
            color: "#ffffff",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#3a4d8f",
          color: "#ffffff",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
