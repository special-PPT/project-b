import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RegTokenTable from "./RegTokenTable";
import HrHiringTableMobile from "./HrHiringTableMobile";
import OnboardAppReviewTable from "./OnboardAppReviewTable";
import { regData } from "../data/HiringData";
import { onboardDataArray } from "../data/HiringData";

type HrHiringManagementProps = {
  // your props here
};

const HrHiringManagement: React.FC<HrHiringManagementProps> = (props) => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState("registrationToken");
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrentTab(event.target.value);
  };

  return (
    <>
      <FormControl
        sx={{
          m: 1,
          minWidth: !isMobile ? 200 : "90%",
          maxWidth: 350,
          paddingTop: isMobile ? "15px" : "15px",
          paddingLeft: isMobile ? 0 : "35px",
          paddingBottom: isMobile ? 0 : "15px",
          margin: isMobile ? "auto" : undefined,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Select
          value={currentTab}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            borderRadius: 3,
            height: 45,
            backgroundColor: alpha(theme.palette.primary.light, 0.35),
          }}
        >
          <MenuItem value="registrationToken">Registration Token</MenuItem>
          <MenuItem value="onboardingApplicationReview">
            Onboarding Application Review
          </MenuItem>
        </Select>
      </FormControl>
      {!isMobile ? (
        <>
          {currentTab === "registrationToken" && (
            <RegTokenTable rows={regData} />
          )}
          {currentTab === "onboardingApplicationReview" && (
            <OnboardAppReviewTable rows={onboardDataArray} />
          )}
        </>
      ) : (
        <HrHiringTableMobile currentTab={currentTab} rows={regData} />
      )}
    </>
  );
};

export default HrHiringManagement;
