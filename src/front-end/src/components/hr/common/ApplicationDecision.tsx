import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateEmployeeOnboardingApplicationStatus } from "../../../redux/features/hr/hrSlice";

interface DecisionButtonsProps {
  employeeId: string;
}

const AppDecisionButtons: React.FC<DecisionButtonsProps> = ({ employeeId }) => {
  const dispatch = useDispatch();
  const pastelDarkGreen = "#3cb371";
  const pastelDarkRed = "#cd5c5c";

  const buttonStyles = {
    mr: 1,
    color: pastelDarkGreen,
    borderColor: pastelDarkGreen,
    "&:hover": {
      backgroundColor: "rgba(152, 251, 152, 0.1)",
    },

    padding: "8px 15px",
    minWidth: "220px",
    height: "40px",
  };

  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  const updateApplicationStatus = async (
    employee_id: string,
    isAccept: boolean,
    feedback: string
  ) => {
    try {
      dispatch(
        updateEmployeeOnboardingApplicationStatus({
          employee_id,
          status: isAccept ? "Approved" : "Rejected",
          feedback,
        })
      );

      const response = await axios.post(
        "http://localhost:8000/hr/updateOnboardingStatus",
        {
          employee_id,
          isAccept,
          feedback,
        }
      );

      console.log("Response:", response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error with request:", error.message);
        throw error;
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const handleAccept = () => {
    updateApplicationStatus(employeeId, true, "");
  };

  const handleReject = () => {
    if (showFeedbackInput) {
      updateApplicationStatus(employeeId, false, feedback);
      setFeedback("");
    } else {
      setShowFeedbackInput(true);
    }
  };

  return (
    <Box sx={{ mt: 1, alignSelf: "stretch", marginLeft: "20px" }}>
      <Button
        variant="outlined"
        size="small"
        sx={{ ...buttonStyles }}
        startIcon={<CheckIcon />}
        onClick={handleAccept}
      >
        Accept
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{
          ...buttonStyles,
          color: pastelDarkRed,
          borderColor: pastelDarkRed,
        }}
        startIcon={<WarningAmberIcon />}
        onClick={handleReject}
      >
        Reject
      </Button>
      {showFeedbackInput && (
        <TextField
          label="Feedback"
          variant="outlined"
          size="small"
          multiline
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mt: 1, width: "100%", marginTop: "20px" }}
        />
      )}
    </Box>
  );
};

export default AppDecisionButtons;
