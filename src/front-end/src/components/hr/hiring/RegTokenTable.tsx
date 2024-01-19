import React, { useState } from "react";
import { useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSearch from "../TableSearch";
import Box from "@mui/material/Box";
import {
  StyledPaper,
  StyledTableContainer,
  StyledHeaderCell,
  StyledBodyCell,
  ClickableSpan,
} from "../../../styles/hr/profile";
import {
  handleRowClick,
  handleSendClick,
  handleLinkClick,
  handleClickHistory,
} from "../utils/utils";
import SendIcon from "@mui/icons-material/Send";

interface Column {
  id:
    | "employee_id"
    | "name"
    | "email"
    | "generate_token_and_send_email"
    | "link"
    | "status";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "employee_id", label: "Employee ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  {
    id: "generate_token_and_send_email",
    label: "Generate token and send email",
    minWidth: 100,
  },
  { id: "link", label: "Link", minWidth: 150 },
  { id: "status", label: "Status", minWidth: 100 },
];

interface Data {
  employee_id: number;
  name: string;
  email: string;
  generate_token_and_send_email: boolean;
  link: string;
  status: string;
}

type RegTokenTableProps = {
  rows: Data[];
};

const RegTokenTable: React.FC<RegTokenTableProps> = ({
  rows,
}) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredRows = rows
    .filter((row) => row.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      const lastNameA = a.name.split(" ").pop()?.toLowerCase() ?? "";
      const lastNameB = b.name.split(" ").pop()?.toLowerCase() ?? "";
      return lastNameA.localeCompare(lastNameB);
    });

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TableSearch onSearchChange={handleSearchChange} />
        <ClickableSpan
          onClick={handleClickHistory}
          style={{ marginRight: "16px", cursor: "pointer" }}
        >
          History
        </ClickableSpan>
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
                  <StyledBodyCell style={{ textAlign: "center" }}>
                    {row.generate_token_and_send_email ? (
                      <SendIcon
                        style={{
                          color: theme.palette.primary.light,
                          cursor: "pointer",
                        }}
                        onClick={() => handleSendClick(row.employee_id)}
                      />
                    ) : (
                      <SendIcon style={{ color: "grey" }} />
                    )}
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <ClickableSpan onClick={() => handleLinkClick(row.link)}>
                      {row.link}
                    </ClickableSpan>
                  </StyledBodyCell>
                  <StyledBodyCell>{row.status}</StyledBodyCell>
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

export default RegTokenTable;
