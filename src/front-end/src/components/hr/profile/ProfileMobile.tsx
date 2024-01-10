import React, { useState } from "react";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  EmployeeDataInterface,
  DocumentInterface,
} from "../data/EmployeeDataInterfaces";
import { DocumentsElement } from "./profileElements";

interface InfoDisplayComponentProps {
  title: string;
  data: Record<string, any>;
  style: React.CSSProperties;
}

const InfoDisplayComponent: React.FC<InfoDisplayComponentProps> = ({
  title,
  data,
  style,
}) => {
  return (
    <Box style={style}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          paddingBottom: "5px",
          fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
        }}
      >
        {title.toUpperCase()}
      </Typography>
      {Object.entries(data).map(([key, value]) => (
        <Grid container key={key} spacing={1}>
          <Grid item xs={6}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "regular",
                fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              {key}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{
                wordBreak: "break-all",
                fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              {value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

interface ProfileMobileProps {
  employeeData: EmployeeDataInterface;
  documents: DocumentInterface[];
}

const ProfileMobile: React.FC<ProfileMobileProps> = ({
  employeeData,
  documents,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const style: React.CSSProperties = {
    backgroundColor: alpha(theme.palette.primary.light, 0.3),
    borderRadius: 10,
    padding: "30px",
    margin: "20px",
  };

  const renderBasicInfo = () => {
    return (
      <>
        <InfoDisplayComponent
          title="Basic Info"
          data={employeeData.basic_info}
          style={style}
        />
        <InfoDisplayComponent
          title="Address"
          data={employeeData.address}
          style={style}
        />
        <InfoDisplayComponent
          title="Contact"
          data={employeeData.contact}
          style={style}
        />
        <InfoDisplayComponent
          title="Visa Status"
          data={employeeData.visa_status}
          style={style}
        />
      </>
    );
  };

  const renderEmergencyContact = () => {
    return (
      <>
        <InfoDisplayComponent
          title="Emergency Contact 1"
          data={employeeData.emergency_contact1}
          style={style}
        />
        <InfoDisplayComponent
          title="Emergency Contact 2"
          data={employeeData.emergency_contact2}
          style={style}
        />
      </>
    );
  };

  const renderInfo = () => {
    switch (value) {
      case 0:
        return renderBasicInfo();
      case 1:
        return (
          <InfoDisplayComponent
            title="Reference"
            data={employeeData.reference}
            style={style}
          />
        );
      case 2:
        return renderEmergencyContact();
      // Add other cases
      default:
        return <DocumentsElement documents={documents} />;
    }
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Avatar
          src={employeeData.avatar}
          sx={{
            mx: "auto",
            width: theme.spacing(10),
            height: theme.spacing(10),
          }}
        />
        <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
          {employeeData.basic_info.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          ID: {employeeData.basic_info.employee_id}
        </Typography>
      </Box>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
      >
        <BottomNavigationAction
          label="Basic Info"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "1rem" } }}
        />
        <BottomNavigationAction
          label="Reference"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "1rem" } }}
        />
        <BottomNavigationAction
          label="Emergency Contact"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "1rem" } }}
        />
        <BottomNavigationAction
          label="Documents"
          sx={{ "& .MuiBottomNavigationAction-label": { fontSize: "1rem" } }}
        />
      </BottomNavigation>

      <Box>{renderInfo()}</Box>
    </Box>
  );
};

export default ProfileMobile;
