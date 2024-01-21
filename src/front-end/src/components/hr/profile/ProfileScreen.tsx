import React from "react";
import { Box, Grid, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getRectangleStyle } from "../../../styles/hr/profile";
import { useParams } from "react-router-dom";
import {
  Element01,
  Element10,
  Element11,
  Element02,
  AvatarBox,
  DocumentsElement,
} from "./profileElements";
import ProfileMobile from "./ProfileMobile";
import {
  transformEmployeeToProfileData,
  transformProfileDocuments,
} from "../data/profile/profileDataTramsformUtils";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";

const ProfileScreen: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const employees = useTypedSelector((state) => state.hr.employees);
  const employee =
    employeeId && employees[employeeId] ? employees[employeeId] : undefined;
  const [employeeData, documents] = employee
    ? [
        transformEmployeeToProfileData(employee),
        transformProfileDocuments(employee.personalInformation.documents),
      ]
    : [null, null];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // height percentages for the top rows
  const rowHeightPercentages = ["50%", "70%", "55%"];
  const largeBoxHeight = 740;

  const rowHeights = rowHeightPercentages.map((percentage) => {
    const heightWithoutPadding = largeBoxHeight;
    const topHeight = (parseFloat(percentage) / 100) * heightWithoutPadding;
    const bottomHeight = heightWithoutPadding - topHeight;
    return { topHeight, bottomHeight };
  });

  return employeeData ? (
    !isMobile ? (
      <Box
        sx={{
          margin: "20px",
          width: "95%",
          height: `${largeBoxHeight}px`,
          borderRadius: 12,
          border: "2px solid #a1caff",
          alignSelf: "center",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={0}>
          {rowHeights.map(({ topHeight, bottomHeight }, columnIndex) => (
            <Grid item sm={4} key={columnIndex}>
              <Box
                sx={{
                  height: `${topHeight}px`,
                  ...getRectangleStyle(0, columnIndex),
                }}
              >
                {/* Content of the first row */}
                {columnIndex === 0 && (
                  <AvatarBox
                    topHeight={topHeight}
                    avatar={employeeData.avatar}
                  />
                )}
                {columnIndex === 1 && <Element01 employeeData={employeeData} />}
                {columnIndex === 2 && <Element02 employeeData={employeeData} />}
              </Box>
              <Box
                sx={{
                  height: `${bottomHeight}px`,
                  ...getRectangleStyle(1, columnIndex),
                }}
              >
                {/* Content of the second row */}
                {columnIndex === 0 && <Element10 employeeData={employeeData} />}
                {columnIndex === 1 && <Element11 employeeData={employeeData} />}
                {columnIndex === 2 && (
                  <DocumentsElement documents={documents} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    ) : (
      <ProfileMobile employeeData={employeeData} documents={documents} />
    )
  ) : (
    <Box sx={{ margin: "20px", alignSelf: "center" }}>
      <Typography>This employee doesn't exist.</Typography>
    </Box>
  );
};

export default ProfileScreen;
