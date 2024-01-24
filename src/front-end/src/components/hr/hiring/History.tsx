import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getHrManagementData } from "../data/hiring/hiringDataTransformUtils";
import { HistoryRow } from '../data/hiring/EmployeeDataInterfaces';

export default function History() {
  // TODO: get hr id from cookie
  const [rows, setRows] = useState<HistoryRow[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getHrManagementData("65b04d2ea01027291e2cc4d2");
      setRows(data);
    }

    fetchData();
  }, []); 
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
