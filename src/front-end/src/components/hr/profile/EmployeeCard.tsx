import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { ClickableSpan } from "../../../styles/hr/profile";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { handleRowClick } from "../utils/utils";

interface EmployeeCardProps {
  employee_id: number;
  name: string;
  ssn: string;
  work_auth: string;
  phone: string;
  email: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.primary.light, 0.35),
  margin: theme.spacing(2),
  borderRadius: 10,
}));

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee_id,
  name,
  ssn,
  work_auth,
  phone,
  email,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">
          <ClickableSpan onClick={() => handleRowClick(employee_id.toString())}>
            {name}
          </ClickableSpan>
        </Typography>
        <Typography color="textSecondary">ID: {employee_id}</Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Typography variant="body2">SSN: {ssn}</Typography>
        <Typography variant="body2">Work Authorization: {work_auth}</Typography>
        <Typography variant="body2">Phone: {phone}</Typography>
        <Typography variant="body2">Email: {email}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default EmployeeCard;
