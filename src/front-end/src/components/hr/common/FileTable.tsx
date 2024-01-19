import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface FileRow {
  name: string;
  modifiedTime: string;
  size: string;
}

interface FileTableProps {
  fileTable: FileRow[];
}

const FileTable: React.FC<FileTableProps> = ({ fileTable }) => (
  <Box sx={{ m: 2 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {["Name", "Last modified", "Size", "Download", "Preview"].map(
              (header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold" }}
                  align={header === "Name" ? "inherit" : "right"}
                >
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {fileTable.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.modifiedTime}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">
                <Button>
                  <DownloadIcon />
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button>
                  <RemoveRedEyeIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default FileTable;
