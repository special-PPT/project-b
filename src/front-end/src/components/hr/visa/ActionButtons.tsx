import React, { useState } from "react";
import Button from "@mui/material/Button";
import FilesModal from "./FilesModal";
import { useTheme } from "@mui/material";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { sendNotificationEmail } from "../utils/utils";
import CircularProgress from "@mui/material/CircularProgress";

interface ActionButtonsProps {
  employeeId: string;
  nextStep: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  employeeId,
  nextStep,
}) => {
  const theme = useTheme();
  const employees = useTypedSelector((state) => state.hr.employees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendToken = () => {
    alert("Token has been sent");
  };

  const handleSendNotification = async () => {
    setIsLoading(true); 
    let email = employees[employeeId].email;
    await sendNotificationEmail(email, nextStep);
    setIsLoading(false); 
  };

  const handlePreview = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let buttonContent: React.ReactNode = "Send Notification";
  if (isLoading) {
    buttonContent = <CircularProgress size={24} />;
  }

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
  } else if (nextStep === "Wait for Approval") {
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
        disabled={isLoading}
        sx={buttonStyle}
      >
        {buttonContent}
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
