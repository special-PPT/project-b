import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface HistoryRow {
  email: string;
  name: string;
  registrationLink: string;
  status: string;
}

function createData(
  email: string,
  name: string,
  registrationLink: string,
  status: string
): HistoryRow {
  return { email, name, registrationLink, status };
}

const rows = [
  createData(
    "john.doe@example.com",
    "John Doe",
    "http://example.com/register/123",
    "Submitted"
  ),
  createData(
    "jane.smith@example.com",
    "Jane Smith",
    "http://example.com/register/456",
    "Not Submitted"
  ),
];

export default function History() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email Address</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Registration Link</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.registrationLink}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
