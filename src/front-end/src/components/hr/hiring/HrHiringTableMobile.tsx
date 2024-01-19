import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { ClickableSpan } from "../../../styles/hr/profile";
import { handleClickHistory } from "../utils/utils";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

interface Data {
  employee_id: number;
  name: string;
  email: string;
  generate_token_and_send_email?: boolean;
  link?: string;
  status: string;
}

type HrHiringTableMobileProps = {
  currentTab: string;
  rows: Data[];
};

const HrHiringTableMobile: React.FC<HrHiringTableMobileProps> = ({
  currentTab,
  rows,
}) => {
  const [selectedTab, setSelectedTab] = useState("pending");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const actionStyle = {
    "& .MuiBottomNavigationAction-label": {
      fontSize: "1rem",
      "&.Mui-selected": {
        fontSize: "1rem",
        textDecoration: "underline",
      },
    },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
          paddingTop: "10px",
        }}
      >
        {currentTab === "registrationToken" && (
          <ClickableSpan
            onClick={handleClickHistory}
            style={{ cursor: "pointer" }}
          >
            History
          </ClickableSpan>
        )}
      </div>
      {currentTab === "onboardingApplicationReview" && (
        <Box sx={{}}>
          <BottomNavigation
            value={selectedTab}
            onChange={handleTabChange}
            showLabels
          >
            <BottomNavigationAction
              label="Pending"
              value="pending"
              sx={actionStyle}
            />
            <BottomNavigationAction
              label="Rejected"
              value="rejected"
              sx={actionStyle}
            />
            <BottomNavigationAction
              label="Approved"
              value="approved"
              sx={actionStyle}
            />
          </BottomNavigation>
        </Box>
      )}
      {currentTab === "registrationToken"
        ? rows.map((row) => (
            <EmployeeCard
              key={row.employee_id}
              employee_id={row.employee_id}
              name={row.name}
              email={row.email}
              generate_token_and_send_email={row.generate_token_and_send_email}
              link={row.link}
              status={row.status}
              currTab={currentTab}
            />
          ))
        : rows
            .filter((row) => row.status.toLowerCase() === selectedTab)
            .map((row) => (
              <EmployeeCard
                key={row.employee_id}
                employee_id={row.employee_id}
                name={row.name}
                email={row.email}
                status={row.status}
                currTab={currentTab}
              />
            ))}
    </>
  );
};

export default HrHiringTableMobile;
