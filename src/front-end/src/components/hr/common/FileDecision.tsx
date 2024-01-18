import React from 'react';
import { Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface DecisionButtonsProps {
  biggerButton?: boolean;
}

const DecisionButtons: React.FC<DecisionButtonsProps> = ({ biggerButton = false }) => {
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
      padding: '8px 15px', 
      minWidth: '220px', 
      height: '40px', 
    }),
  };

  return (
    <Box sx={{ mt: 1, alignSelf: "stretch", marginLeft: "20px" }}>
      <Button
        variant="outlined"
        size="small"
        sx={{ 
          ...buttonStyles,
          color: pastelDarkGreen,
          borderColor: pastelDarkGreen
        }}
        startIcon={<CheckIcon />}
      >
        Accept
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ 
          ...buttonStyles,
          color: pastelDarkRed,
          borderColor: pastelDarkRed
        }}
        startIcon={<WarningAmberIcon />}
      >
        Reject
      </Button>
    </Box>
  );
};

export default DecisionButtons;
