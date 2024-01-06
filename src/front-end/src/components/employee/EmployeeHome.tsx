import { Container, Typography } from "@mui/material";

export default function EmployeeHome() {
  const applicationStatus = "Approved";
  const applicationFeedback = "Your application has been approved, please use other tabs to edit or download documents.";

  return (
    <Container maxWidth="xl">
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "h5.fontSize",
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
        }}
      >
        {applicationFeedback}
      </Typography>
    </Container>
  );
}
