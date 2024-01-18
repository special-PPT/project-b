import React from "react";
import Button from "@mui/material/Button";
import FilesModal from "./FilesModal";
import { useTheme } from "@mui/material";

interface ActionButtonsProps {
  employeeId: number;
  nextStep: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  employeeId,
  nextStep,
}) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSendToken = () => {
    // Placeholder for API call
    alert("Token has been sent");
  };

  const handleSendNotification = () => {
    // Placeholder for API call
    alert("Notification has been sent");
  };

  const handlePreview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let button;
  const buttonStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  };

  if (nextStep === "Send Registration Token") {
    button = (
      <Button variant="contained" onClick={handleSendToken} sx={buttonStyle}>
        Send Token
      </Button>
    );
  } else if (nextStep === "Wait for Approve") {
    button = (
      <Button variant="contained" onClick={handlePreview} sx={buttonStyle}>
        Preview
      </Button>
    );
  } else if (nextStep.startsWith("Submit")) {
    button = (
      <Button
        variant="contained"
        onClick={handleSendNotification}
        sx={buttonStyle}
      >
        Send Notification
      </Button>
    );
  }

  return (
    <>
      {button}

      <FilesModal
        currTab="inProgress"
        open={isModalOpen}
        onClose={handleCloseModal}
        employee_id={employeeId}
      />
    </>
  );
};

export default ActionButtons;
