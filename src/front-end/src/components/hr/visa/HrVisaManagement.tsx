import React, { useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import VisaTable from "./VisaTable";
import { actionStyle } from "../utils/utils";
import VisaTableMobile from "./VisaTableMobile";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { transformEmployeeToEmployeeData } from "../data/visa/visaDataTransformUtils";

export default function HrVisaManagement() {
  const employees = useTypedSelector((state) => state.hr.employees);
  const rows = Object.values(employees)
    .map((employee) => transformEmployeeToEmployeeData(employee))
    .filter((employee) => employee.work_auth === "F1(CPT/OPT)");

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
            <BottomNavigationAction label="All" value="all" sx={actionStyle} />
            <BottomNavigationAction
              label="In Progress"
              value="inProgress"
              sx={actionStyle}
            />
          </BottomNavigation>

          {currentTab === "all" && (
            <VisaTable rows={rows} currTab={currentTab} />
          )}
          {currentTab === "inProgress" && (
            <VisaTable
              rows={rows.filter((row) => row.next_step !== "Completed" && row.next_step !== "Send Registration Token" )}
              currTab={currentTab}
            />
          )}
        </>
      ) : (
        <VisaTableMobile rows={rows} />
      )}
    </>
  );
}
