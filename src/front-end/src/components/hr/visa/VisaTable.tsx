import React, { useState } from "react";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSearch from "../TableSearch";
import {
  StyledPaper,
  StyledTableContainer,
  StyledHeaderCell,
  StyledBodyCell,
  ClickableSpan,
} from "../../../styles/hr/profile";
import DescriptionIcon from "@mui/icons-material/Description";
import FilesModal from "./FilesModal";
import ActionButtons from "./ActionButtons";

interface Column {
  id:
    | "employee_id"
    | "name"
    | "work_auth"
    | "start_day"
    | "end_day"
    | "remaining"
    | "next_step"
    | "documents";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "employee_id", label: "Employee ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "work_auth", label: "Work Auth", minWidth: 60 },
  { id: "start_day", label: "Start Day", minWidth: 70 },
  { id: "end_day", label: "End Day", minWidth: 70 },
  { id: "remaining", label: "Remaining", minWidth: 70 },
  { id: "next_step", label: "Next Step", minWidth: 80 },
  { id: "documents", label: "Documents", minWidth: 50 },
];

interface Data {
  employee_id: number;
  name: string;
  work_auth: string;
  start_day: string;
  end_day: string;
  remaining: number;
  next_step: string;
}

interface VisaTableProps {
  rows: Data[];
  currTab: string;
}

const VisaTable: React.FC<VisaTableProps> = ({ rows, currTab }) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currSelectedId, setCurrSelectedId] = useState(0);

  const handleRowClick = (employeeId: String) => {
    const url = `/hr/employee-profile/${employeeId}`;
    window.open(url, "_blank");
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleOpenModal = (id: number) => {
    setCurrSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredRows = rows
    .filter((row) => {
      // TODO: is name part of input in backend APIs?
      return row.name.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      const lastNameA = a.name.split(" ").pop()?.toLowerCase() ?? "";
      const lastNameB = b.name.split(" ").pop()?.toLowerCase() ?? "";
      return lastNameA.localeCompare(lastNameB);
    });

  return (
    <StyledPaper>
      <TableSearch onSearchChange={handleSearchChange} />

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
                  {columns.map((column) => {
                    if (column.id === "documents") {
                      return currTab === "all" ? (
                        <StyledBodyCell key={column.id} align="center">
                          <DescriptionIcon
                            fontSize="large"
                            sx={{
                              color: theme.palette.primary.main,
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpenModal(row.employee_id)}
                          />
                        </StyledBodyCell>
                      ) : (
                        <StyledBodyCell key={column.id} align="center">
                          <ActionButtons
                            employeeId={row.employee_id}
                            nextStep={row.next_step}
                          />
                        </StyledBodyCell>
                      );
                    } else {
                      const value = row[column.id];
                      return (
                        <StyledBodyCell key={column.id} align={column.align}>
                          {column.id === "name" ? (
                            <ClickableSpan
                              onClick={() =>
                                handleRowClick(row.employee_id.toString())
                              }
                            >
                              {value}
                            </ClickableSpan>
                          ) : (
                            value
                          )}
                        </StyledBodyCell>
                      );
                    }
                  })}
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
      <FilesModal
        currTab={currTab}
        open={isModalOpen}
        onClose={handleCloseModal}
        employee_id={currSelectedId}
      />
    </StyledPaper>
  );
};

export default VisaTable;
