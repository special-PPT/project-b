import React, { useState } from "react";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { handleRowClick, handleApplicationClick } from "../utils/utils";
import {
  StyledPaper,
  StyledTableContainer,
  StyledHeaderCell,
  StyledBodyCell,
  ClickableSpan,
} from "../../../styles/hr/profile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { actionStyle } from "../utils/utils";

interface Column {
  id: "employee_id" | "name" | "email" | "status" | "view";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "employee_id", label: "Employee ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "view", label: "View Application", minWidth: 50 },
];

interface Data {
  employee_id: number;
  name: string;
  email: string;
  status: string;
}

type OnboardAppReviewTableProps = {
  rows: Data[];
};

const OnboardAppReviewTable: React.FC<OnboardAppReviewTableProps> = ({
  rows,
}) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState("pending");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows
    .filter((row) => row.status.toLowerCase() === selectedTab)
    .sort((a, b) => {
      const lastNameA = a.name.split(" ").pop()?.toLowerCase() ?? "";
      const lastNameB = b.name.split(" ").pop()?.toLowerCase() ?? "";
      return lastNameA.localeCompare(lastNameB);
    });

  return (
    <StyledPaper>
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          value={selectedTab}
          onChange={handleTabChange}
          showLabels
        >
          <BottomNavigationAction
            label="Pending"
            value="pending"
            sx={actionStyle}
          />
          <BottomNavigationAction
            label="Rejected"
            value="rejected"
            sx={actionStyle}
          />
          <BottomNavigationAction
            label="Approved"
            value="approved"
            sx={actionStyle}
          />
        </BottomNavigation>
      </Box>

      <StyledTableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledHeaderCell
                  key={column.id}
                  align={column.align}
                  minWidth={column.minWidth}
                >
                  {column.label}
                </StyledHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.employee_id}
                >
                  <StyledBodyCell>{row.employee_id}</StyledBodyCell>
                  <StyledBodyCell>
                    <ClickableSpan
                      onClick={() => handleRowClick(row.employee_id.toString())}
                    >
                      {row.name}
                    </ClickableSpan>
                  </StyledBodyCell>
                  <StyledBodyCell>{row.email}</StyledBodyCell>
                  <StyledBodyCell>{row.status}</StyledBodyCell>
                  <StyledBodyCell>
                    <VisibilityIcon
                      fontSize="large"
                      sx={{
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleApplicationClick(row.employee_id.toString())
                      }
                    />
                  </StyledBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPaper>
  );
};

export default OnboardAppReviewTable;
