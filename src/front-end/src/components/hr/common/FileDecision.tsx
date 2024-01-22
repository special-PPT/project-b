import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateVisaDocumentStatus } from "../../../redux/features/hr/hrSlice";

interface DecisionButtonsProps {
  employeeId: string;
  type: string;
  biggerButton?: boolean;
}

const DecisionButtons: React.FC<DecisionButtonsProps> = ({
  employeeId,
  type,
  biggerButton = false,
}) => {
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
    ...(biggerButton && {
      padding: "8px 15px",
      minWidth: "220px",
      height: "40px",
    }),
  };

  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedback, setFeedback] = useState("");

  const updateDocumentStatus = async (isAccept: boolean, feedback: string) => {
    const status = isAccept ? "Accepted" : "Rejected";
    await axios.put("http://localhost:8000/hr/updateVisaDocStatus", {
      employee_id: employeeId,
      type: type,
      isAccept,
      feedback,
    });
    // Dispatch the action to update Redux store
    dispatch(
      updateVisaDocumentStatus({
        employee_id: employeeId,
        type: type,
        status,
        feedback: isAccept ? "" : feedback,
      })
    );
    if (isAccept) {
      setFeedback(""); 
    }
    setShowFeedbackInput(false); 
  };

  const handleAccept = () => {
    updateDocumentStatus(true, "");
  };

  const handleReject = () => {
    if (showFeedbackInput) {
      updateDocumentStatus(false, feedback);
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
          sx={{ mt: 1, width: '100%', marginTop: "20px" }}
        />
      )}
    </Box>
  );
};

export default DecisionButtons;
