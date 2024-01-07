import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

interface Data {
  employee_id: number;
  name: string;
  ssn: string;
  work_auth: string;
  phone: string;
  email: string;
}

function createData(
  employee_id: number,
  name: string,
  ssn: string,
  work_auth: string,
  phone: string,
  email: string
): Data {
  return { employee_id, name, ssn, work_auth, phone, email };
}

// TODO: get data from API
const rows = [
  createData(
    101,
    "Alice Smith",
    "123-45-6789",
    "Yes",
    "555-0101",
    "alice@example.com"
  ),
  createData(
    102,
    "Bob Johnson",
    "987-65-4321",
    "No",
    "555-0102",
    "bob@example.com"
  ),
  createData(
    103,
    "Carol Williams",
    "234-56-7890",
    "Yes",
    "555-0103",
    "carol@example.com"
  ),
  createData(
    104,
    "David Brown",
    "890-12-3456",
    "Yes",
    "555-0104",
    "david@example.com"
  ),
  createData(
    105,
    "Eve Davis",
    "567-89-0123",
    "No",
    "555-0105",
    "eve@example.com"
  ),
  createData(
    106,
    "Frank Miller",
    "345-67-8901",
    "Yes",
    "555-0106",
    "frank@example.com"
  ),
  createData(
    107,
    "Grace Lee",
    "456-78-9012",
    "Yes",
    "555-0107",
    "grace@example.com"
  ),
  createData(
    108,
    "Henry Wilson",
    "678-90-1234",
    "No",
    "555-0108",
    "henry@example.com"
  ),
  createData(
    109,
    "Ivy Taylor",
    "789-01-2345",
    "Yes",
    "555-0109",
    "ivy@example.com"
  ),
  createData(
    110,
    "Jack Davis",
    "890-12-3456",
    "No",
    "555-0110",
    "jack@example.com"
  ),
  createData(
    111,
    "Kathy Brown",
    "901-23-4567",
    "Yes",
    "555-0111",
    "kathy@example.com"
  ),
  createData(
    112,
    "Liam Smith",
    "012-34-5678",
    "No",
    "555-0112",
    "liam@example.com"
  ),
  createData(
    113,
    "Mia Johnson",
    "123-45-6789",
    "Yes",
    "555-0113",
    "mia@example.com"
  ),
  createData(
    114,
    "Noah Williams",
    "234-56-7890",
    "No",
    "555-0114",
    "noah@example.com"
  ),
  createData(
    115,
    "Olivia Brown",
    "345-67-8901",
    "Yes",
    "555-0115",
    "olivia@example.com"
  ),
];

export default function HrEmployeeProfiles() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        padding: "10px",
        alignSelf: "center",
        marginTop: "30px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: (theme) => theme.palette.primary.dark, 
      }}
    >
      <TableContainer
        sx={{
          minHeight: "500px",
          maxHeight: "100%",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.employee_id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            fontSize: "16px",
                            minHeight: "15px",
                            maxHeight: "15px",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
