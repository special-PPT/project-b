import React, { useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisaTable from "./VisaTable";
import VisaTableMobile from "./VisaTableMobile";

interface Column {
  id:
    | "employee_id"
    | "name"
    | "work_auth"
    | "start_day"
    | "end_day"
    | "remaining"
    | "next_step"
    | "documents";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "employee_id", label: "Employee ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "work_auth", label: "Work Auth", minWidth: 60 },
  { id: "start_day", label: "Start Day", minWidth: 70 },
  { id: "end_day", label: "End Day", minWidth: 70 },
  { id: "remaining", label: "Remaining", minWidth: 70 },
  { id: "next_step", label: "Next Step", minWidth: 80 },
  { id: "documents", label: "Documents", minWidth: 50 },
];

interface Data {
  employee_id: number;
  name: string;
  work_auth: string;
  start_day: string;
  end_day: string;
  remaining: number;
  next_step: string;
}

function createData(
  employee_id: number,
  name: string,
  work_auth: string,
  start_day: string,
  end_day: string,
  remaining: number,
  next_step: string
): Data {
  return {
    employee_id,
    name,
    work_auth,
    start_day,
    end_day,
    remaining,
    next_step,
  };
}

// TODO: get data from API: this is functions generating testing data
function generateRandomData(index: number): Data {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Ivan",
    "Julia",
    "Kevin",
    "Luna",
    "Morgan",
    "Nina",
    "Oscar",
  ];
  const workAuths = ["Green Card", "H1B", "OPT"];
  const startDate = `2024-01-${10 + index}`;
  const endDate = `2024-12-${10 + index}`;
  const remainingDays = 365 - 10 - index;
  const nextSteps = [
    "Send Registration Token",
    "Completed",
    "Submit OPT Receipt",
    "Submit OPT EAD",
    "Submit OPT I-983",
    "Submit OPT I-20",
    "Wait for Approve",
  ];

  return createData(
    index + 1,
    names[index % names.length],
    workAuths[Math.floor(Math.random() * workAuths.length)],
    startDate,
    endDate,
    remainingDays,
    nextSteps[Math.floor(Math.random() * nextSteps.length)]
  );
}
const rows: Data[] = [];
for (let i = 0; i < 15; i++) {
  rows.push(generateRandomData(i));
}

export default function HrVisaManagement() {
  const [currentTab, setCurrentTab] = useState("all");
  const isMobile = useMediaQuery("(max-width:600px)");

  const bottomNavStyle = {
    display: "flex",
    justifyContent: "left",
    marginTop: "10px",
  };

  return (
    <>
      {!isMobile ? (
        <>
          <BottomNavigation
            showLabels
            value={currentTab}
            onChange={(event, newValue) => {
              setCurrentTab(newValue);
            }}
            style={bottomNavStyle}
          >
            <BottomNavigationAction
              label="All"
              value="all"
              sx={{
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "1.3rem",
                  "&.Mui-selected": { fontSize: "1.3rem" },
                },
              }}
            />
            <BottomNavigationAction
              label="In Progress"
              value="inProgress"
              sx={{
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "1.3rem",
                  "&.Mui-selected": { fontSize: "1.3rem" },
                },
              }}
            />
          </BottomNavigation>

          {currentTab === "all" && (
            <VisaTable rows={rows} columns={columns} currTab={currentTab} />
          )}
          {currentTab === "inProgress" && (
            <VisaTable
              rows={rows.filter((row) => row.next_step !== "Completed")}
              columns={columns}
              currTab={currentTab}
            />
          )}
        </>
      ) : (
        <VisaTableMobile rows={rows} columns={columns} />
      )}
    </>
  );
}
