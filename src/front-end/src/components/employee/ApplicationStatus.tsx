import React, { useEffect, useState } from "react";
import { Typography, useTheme, useMediaQuery, Container } from "@mui/material";

const ApplicationStatus: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [applicationStatus, setStatus] = useState("");
  const [applicationFeedback, setMessage] = useState("");

  const mobileStyles = {
    statusFontSize: isMobile ? '1.4rem' : "1.6rem", 
    messageFontSize: isMobile ? '0.7rem' : "0.8rem", 
    textAlign: isMobile ? 'center' : 'left',     
  };

  useEffect(() => {
    // TODO: use API here to get application status
    let newStatus = "pending";

    switch (newStatus) {
      case "pending":
        setStatus("Pending");
        setMessage("Please wait for HR to review your application.");
        break;
      case "approved":
        setStatus("Approved");
        setMessage(
          "Your application has been approved, please use other tabs to edit or download documents."
        );
        break;
      case "rejected":
        setStatus("Approved");
        // TODO: get rejected message from API
        let rejectedMessage: string = "Rejected message...";
        setMessage(rejectedMessage);
        break;
      default:
        setStatus("Unknown");
        setMessage("Please refresh to get most up to date status changes.");
        break;
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: mobileStyles.statusFontSize,  
          textAlign: mobileStyles.textAlign, 
          mt: 2,
        }}
        variant="h2"
      >
        Application Status: {applicationStatus}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          mt: 1,
          fontSize: mobileStyles.messageFontSize,  
          textAlign: mobileStyles.textAlign, 
          color: "#808080",
        }}
      >
        {applicationFeedback}
      </Typography>
    </Container>
  );
};

export default ApplicationStatus;
