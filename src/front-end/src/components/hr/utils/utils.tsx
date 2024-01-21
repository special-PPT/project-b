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

const handleApplicationClick = (employeeId: string) => {
  const url = `/hr/employee-application/${employeeId}`;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};


export {
  handleSendClick,
  handleLinkClick,
  handleClickHistory,
  handleRowClick,
  handleApplicationClick,
  actionStyle,
  formatDate,
};
