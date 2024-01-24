import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import EmployeeCard from "../visa/EmployeeCard";
import TableSearch from "../TableSearch";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { StyledPaper } from "../../../styles/hr/profile";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { visaStyles } from "../../../styles/hr/visaTableMobile";
import { EmployeeDataInterface } from "../data/visa/EmployeeDataInterfaces";

interface VisaTableProps {
  rows: EmployeeDataInterface[];
}

const VisaTableMobile: React.FC<VisaTableProps> = ({ rows }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [openModal, setOpenModal] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleOptionSelect = (option: string) => {
    setFilterOption(option);
    setOpenModal(false); 
  };

  const handleIconClick = () => {
    setOpenModal(true); 
  };

  const filteredRows = rows
    .filter((row) => {
      if (filterOption === "inProgress") {
        return (
          row.next_step !== "Completed" &&
          row.name.toLowerCase().includes(searchQuery)
        );
      }
      return row.name.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      const lastNameA = a.name.split(" ").pop()?.toLowerCase() ?? "";
      const lastNameB = b.name.split(" ").pop()?.toLowerCase() ?? "";
      return lastNameA.localeCompare(lastNameB);
    });

  return (
    <StyledPaper>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={10}>
          <TableSearch onSearchChange={handleSearchChange} />
        </Grid>
        <Grid item xs={2}>
          <Box
            onClick={handleIconClick}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <MenuOpenIcon fontSize="large" />
          </Box>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={visaStyles}>
              <Button
                onClick={() => handleOptionSelect("all")}
                fullWidth
                style={{
                  backgroundColor:
                    filterOption === "all" ? theme.palette.primary.main : "white",
                  color: filterOption === "all" ? "white" : "grey",
                }}
              >
                All
              </Button>
              <Button
                onClick={() => handleOptionSelect("inProgress")}
                fullWidth
                style={{
                  backgroundColor:
                    filterOption === "inProgress" ? theme.palette.primary.main : "white",
                  color: filterOption === "inProgress" ? "white" : "grey",
                }}
              >
                In Progress
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      <>
        {filteredRows.map((row) => (
          <EmployeeCard
            filterOption={filterOption}
            key={row.employee_id}
            employee_id={row.employee_id}
            name={row.name}
            work_auth={row.work_auth}
            start_day={row.start_day}
            end_day={row.end_day}
            remaining={row.remaining}
            next_step={row.next_step}
          />
        ))}
        <Typography style={{ textAlign: "center", marginTop: "20px" }}>
          Total: {filteredRows.length}, End of Display
        </Typography>
      </>
    </StyledPaper>
  );
};

export default VisaTableMobile;
