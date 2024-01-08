import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { TableCell, TableCellProps } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  overflow: "hidden",
  padding: "10px",
  alignSelf: "center",
  marginTop: "30px",
  borderStyle: "solid",
  borderWidth: "2px",
  borderRadius: "12px",
  borderColor: theme.palette.primary.dark,
}));

const StyledTableContainer = styled(TableContainer)({
  minHeight: "500px",
  maxHeight: "100%",
});

interface StyledHeaderCellProps extends TableCellProps {
  minWidth?: number;
}

const StyledHeaderCell = styled(TableCell)<StyledHeaderCellProps>(
  ({ theme, minWidth }) => ({
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: minWidth, // Use custom minWidth prop
  })
);

const StyledBodyCell = styled(TableCell)({
  fontSize: "16px",
  minHeight: "15px",
  maxHeight: "15px",
});

export {StyledPaper, StyledTableContainer, StyledHeaderCell, StyledBodyCell};