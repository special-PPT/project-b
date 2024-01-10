import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface TableSearchProps {
  onSearchChange: (query: string) => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 30,
  backgroundColor: alpha("#F7F6F4", 0.85),
  "&:hover": {
    backgroundColor: alpha("#F7F6F4", 0.85),
  },
  marginRight: theme.spacing(2),
  width: "95%",
  [theme.breakpoints.up("sm")]: {
    width: 300,
  },
  margin: "10px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const TableSearch: React.FC<TableSearchProps> = ({ onSearchChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by name…"
        inputProps={{ "aria-label": "search by name" }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Search>
  );
};

export default TableSearch;
