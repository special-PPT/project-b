import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FilesModal from "./FilesModal";
import ActionButtons from "./ActionButtons";

interface EmployeeCardProps {
  filterOption: string;
  employee_id: number;
  name: string;
  work_auth: string;
  start_day: string;
  end_day: string;
  remaining: number;
  next_step: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  background: alpha(theme.palette.primary.light, 0.35),
  margin: theme.spacing(2),
  borderRadius: 10,
  position: "relative",
}));

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  filterOption,
  employee_id,
  name,
  work_auth,
  start_day,
  end_day,
  remaining,
  next_step,
}) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let iconComponent;
  if (filterOption === "all") {
    iconComponent = (
      <DescriptionIcon
        fontSize="large"
        sx={{
          color: theme.palette.primary.main,
          paddingTop: "10px",
          paddingRight: "10px",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      />
    );
  } else {
    iconComponent = (
      <ActionButtons employeeId={employee_id} nextStep={next_step} />
    );
  }

  return (
    <StyledCard>
      <Box
        position="absolute"
        top={0}
        right={0}
        p={1}
      >
        {iconComponent}
      </Box>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">ID: {employee_id}</Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Typography variant="body2">Work Authorization: {work_auth}</Typography>
        <Typography variant="body2">Start Day: {start_day}</Typography>
        <Typography variant="body2">End Day: {end_day}</Typography>
        <Typography variant="body2">Days Remaining: {remaining}</Typography>
        <Typography variant="body2">Next Step: {next_step}</Typography>
      </CardContent>

      <FilesModal
        currTab={filterOption}
        open={isModalOpen}
        onClose={handleCloseModal}
        employee_id={employee_id}
      />
    </StyledCard>
  );
};

export default EmployeeCard;
