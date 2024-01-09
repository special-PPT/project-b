import React from "react";
import { Box, Grid } from "@mui/material";
import { getRectangleStyle } from "../../styles/hr/profile";
import { useParams } from "react-router-dom";
import {
  Element01,
  Element10,
  Element11,
  Element02,
  AvatarBox,
  DocumentsElement,
} from "./profile/profileElements";

const employeeData = {
  avatar:
    "https://wallpapers-clan.com/wp-content/uploads/2023/06/sad-ghost-dark-blue-background.jpg",
  basic_info: {
    name: "Jane Doe",
    employee_id: "12345",
    ssn: "XXX-XX-1234",
    work_auth: "Citizen",
    phone: "555-123-4567",
    email: "jane.doe@example.com",
    dob: "1980-01-01",
    gender: "Female",
    preferred_name: "Jane",
  },
  address: {
    street: "123 Main St",
    building: "Apt 4",
    city: "Springfield",
    state: "IL",
    zip_code: "62704",
  },
  contact: {
    email: "jane.doe@example.com",
    cell_phone: "555-123-4567",
    work_phone: "555-765-4321",
  },
  visa_status: {
    visa_title: "N/A",
    start_date: "N/A",
    end_date: "N/A",
  },
  reference: {
    name: "John Smith",
    phone_number: "555-987-6543",
    email: "john.smith@example.com",
    relationship: "Former Manager",
  },
  emergency_contact1: {
    name: "Emily Doe",
    phone: "555-321-9876",
    relationship: "Sister",
    email: "emily.doe@example.com",
  },
  emergency_contact2: {
    name: "Michael Doe",
    phone: "555-678-1234",
    relationship: "Brother",
    email: "michaelasdfasdfasdfasdfdfdfdfdf.doe@example.com",
  },
};

const documents = [
  {
    documentName: "Annual Report 2023",
    lastModifiedDate: "2023-12-01",
    documentSize: "2.5 MB",
    canDownload: true,
    canPreview: true,
    documentUrl: "https://example.com/annual-report-2023.pdf",
  },
  {
    documentName: "Employee Handbook",
    lastModifiedDate: "2023-10-15",
    documentSize: "1.2 MB",
    canDownload: true,
    canPreview: false,
    documentUrl: "https://example.com/employee-handbook.pdf",
  },
  {
    documentName: "Project Plan - New Website",
    lastModifiedDate: "2023-11-20",
    documentSize: "3.7 MB",
    canDownload: false,
    canPreview: true,
    documentUrl: "https://example.com/project-plan-website.pdf",
  },
];

const ProfileScreen: React.FC = () => {
  const { employeeId } = useParams();

  // height percentages for the top rows
  const rowHeightPercentages = ["50%", "70%", "55%"];
  const largeBoxHeight = 740;

  const rowHeights = rowHeightPercentages.map((percentage) => {
    const heightWithoutPadding = largeBoxHeight;
    const topHeight = (parseFloat(percentage) / 100) * heightWithoutPadding;
    const bottomHeight = heightWithoutPadding - topHeight;
    return { topHeight, bottomHeight };
  });

  return (
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
                <AvatarBox topHeight={topHeight} avatar={employeeData.avatar} />
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
              {columnIndex === 2 && <DocumentsElement documents={documents} />}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileScreen;
