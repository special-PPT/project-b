import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { ClickableSpan } from "../../../styles/hr/profile";
import SendIcon from "@mui/icons-material/Send";
import {
  handleRowClick,
  handleSendClick,
  handleLinkClick,
  handleApplicationClick,
} from "../utils/utils";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface EmployeeCardProps {
  employee_id: string;
  name: string;
  email: string;
  generate_token_and_send_email?: boolean;
  link?: string;
  status?: string;
  currTab: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.primary.light, 0.35),
  margin: theme.spacing(2),
  borderRadius: 10,
  position: "relative",
}));

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee_id,
  name,
  email,
  generate_token_and_send_email = false,
  link = "",
  status = "",
  currTab,
}) => {
  const theme = useTheme();
  return (
    <StyledCard>
      <CardContent>
        {currTab === "registrationToken" ? (
          generate_token_and_send_email ? (
            <SendIcon
              style={{
                position: "absolute",
                right: 10,
                color: theme.palette.primary.light,
                cursor: "pointer",
              }}
              onClick={() => handleSendClick(employee_id, name, email)}
            />
          ) : (
            <SendIcon
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "grey",
              }}
            />
          )
        ) : (
          <VisibilityIcon
            fontSize="large"
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",
              position: "absolute",
              right: 10,
            }}
            onClick={() => handleApplicationClick(employee_id.toString())}
          />
        )}
        <Typography variant="h6">
          <ClickableSpan onClick={() => handleRowClick(employee_id.toString())}>
            {name}
          </ClickableSpan>
        </Typography>
        <Typography color="textSecondary">ID: {employee_id}</Typography>
        <Typography variant="body2">email: {email}</Typography>
        <Typography variant="body2">Status: {status}</Typography>
        {currTab === "registrationToken" && (
          <>
            <Typography variant="body2">
              <ClickableSpan onClick={() => handleLinkClick(link)}>
                {link}
              </ClickableSpan>
            </Typography>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default EmployeeCard;
