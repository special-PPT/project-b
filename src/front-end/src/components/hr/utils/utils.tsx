const handleSendClick = (id: number) => {
  console.log("clicked");
};

const handleLinkClick = (link: string) => {
  window.open(link, "_blank");
};

const handleClickHistory = () => {
  console.log();
};

const handleRowClick = (employeeId: string) => {
  const url = `/hr/employee-profile/${employeeId}`;
  window.open(url, "_blank");
};

const actionStyle = {
  "& .MuiBottomNavigationAction-label": {
    fontSize: "1.3rem",
    "&.Mui-selected": {
      fontSize: "1.3rem",
      textDecoration: "underline",
    },
  },
};


export { handleSendClick, handleLinkClick, handleClickHistory, handleRowClick, actionStyle };
