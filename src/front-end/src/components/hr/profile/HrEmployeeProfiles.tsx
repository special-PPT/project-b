import * as React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
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
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";

interface Column {
  id: "employee_id" | "name" | "ssn" | "work_auth" | "phone" | "email";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "employee_id", label: "Employee ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "ssn", label: "SSN", minWidth: 100 },
  { id: "work_auth", label: "Work Auth", minWidth: 60 },
  { id: "phone", label: "Phone", minWidth: 90 },
  { id: "email", label: "Email", minWidth: 120 },
];

export default function HrEmployeeProfiles() {
  const employees = useTypedSelector((state) => state.hr.employees);

  // Convert the dictionary to an array and map over it
  const rows = Object.values(employees).map((employee) => ({
    employee_id: employee._id,
    name: `${employee.personalInformation.firstName} ${employee.personalInformation.lastName}`,
    ssn: employee.personalInformation.ssn,
    work_auth: employee.personalInformation.workAuth,
    phone: employee.personalInformation.phoneNumbers.cell,
    email: employee.email,
  }));

  const isMobile = useMediaQuery("(max-width:600px)");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRowClick = (employeeId: String) => {
    const url = `/hr/employee-profile/${employeeId}`;
    window.open(url, "_blank");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
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

  const filteredRows = rows
    .filter((row) => {
      return row.name.toLowerCase().includes(searchQuery);
    })
    .sort((a, b) => {
      const lastNameA = a.name.split(" ").pop()?.toLowerCase() ?? "";
      const lastNameB = b.name.split(" ").pop()?.toLowerCase() ?? "";
      return lastNameA.localeCompare(lastNameB);
    });

  return (
    <StyledPaper style={{ marginTop: "30px" }}>
      <TableSearch onSearchChange={handleSearchChange} />
      {!isMobile ? (
        <>
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
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </StyledBodyCell>
                        );
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
        </>
      ) : (
        <>
          {filteredRows.map((row) => (
            <EmployeeCard
              key={row.employee_id}
              employee_id={row.employee_id}
              name={row.name}
              ssn={row.ssn}
              work_auth={row.work_auth}
              phone={row.phone}
              email={row.email}
            />
          ))}
          <Typography style={{ textAlign: "center", marginTop: "20px" }}>
            Total: {filteredRows.length}, End of Display
          </Typography>
        </>
      )}
    </StyledPaper>
  );
}
