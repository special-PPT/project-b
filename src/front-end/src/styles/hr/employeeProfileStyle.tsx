export const employeeProfileStyles = {
  containerMargin: {
    m: 8,
  },
  marginBottom: {
    mb: 4,
  },
  imageBox: {
    position: "relative",
    width: 200,
    height: 200,
    m: 4,
  },
  editIconBox: {
    position: "absolute",
    top: -10,
    right: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    borderRadius: "50%",
    width: 40,
    height: 40,
  },
  detailBox: {
    m: 2,
    pb: 4,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "70%",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    boxShadow: 4,
  },
  gridPadding: {
    pl: 3,
    pr: 3,
  },
  lastTableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
};
