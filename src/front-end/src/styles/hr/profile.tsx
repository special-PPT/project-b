import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { TableCell, TableCellProps } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledPaper = styled(Paper)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return {
    ...(isMobile
      ? {
          boxShadow: "none",
          borderBottom: "none",
        }
      : {
          width: "90%",
          overflow: "hidden",
          padding: "10px",
          alignSelf: "center",
          marginTop: "30px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "12px",
          borderColor: theme.palette.primary.dark,
        }),
  };
});

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

const ClickableSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.primary.main,
  textDecoration: "underline",
}));

const getRectangleStyle = (rowIndex: number, columnIndex: number) => {
  // Base style
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Style adjustments for borders
  const borderStyle = {
    border: "1px solid #a1caff",
    borderTop: rowIndex === 0 ? "none" : "1px solid #a1caff",
    borderBottom: rowIndex === 1 ? "none" : "1px solid #a1caff",
    borderLeft: columnIndex === 0 ? "none" : "1px solid #a1caff",
    borderRight: columnIndex === 2 ? "none" : "1px solid #a1caff",
  };

  // Customize the style for each rectangle
  switch (`${rowIndex}-${columnIndex}`) {
    case "0-0": // Top left rectangle
      return {
        ...baseStyle,
        ...borderStyle,
        borderTopLeftRadius: 12,
        borderTop: "none",
        borderLeft: "none",
      };
    case "0-1": // Top middle rectangle
      return { ...baseStyle, ...borderStyle };
    case "0-2": // Top right rectangle
      return {
        ...baseStyle,
        ...borderStyle,
        borderTopRightRadius: 12,
        borderTop: "none",
        borderRight: "none",
      };
    case "1-0": // Bottom left rectangle
      return {
        ...baseStyle,
        ...borderStyle,
        borderBottomLeftRadius: 12,
        borderBottom: "none",
        borderLeft: "none",
      };
    case "1-1": // Bottom middle rectangle
      return { ...baseStyle, ...borderStyle };
    case "1-2": // Bottom right rectangle
      return {
        ...baseStyle,
        ...borderStyle,
        borderBottomRightRadius: 12,
        borderBottom: "none",
        borderRight: "none",
      };
    default:
      return baseStyle;
  }
};

export {
  StyledPaper,
  StyledTableContainer,
  StyledHeaderCell,
  StyledBodyCell,
  ClickableSpan,
  getRectangleStyle,
};
