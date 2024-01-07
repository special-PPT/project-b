import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import userImage from "./dashboard/user.png";
import { useState } from "react";

const EditItem = () => {
  return (
    <Button
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        border: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white", // Circle color
          color: "black", // Icon color
        }}
      >
        <EditIcon />
      </Box>
    </Button>
  );
};

export default function EmployeeProfile() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [middleName, setMiddleName] = useState("Yash");
  const [preferredName, setPreferredName] = useState("");
  const [DOB, setDOB] = useState("2000-01-09");
  const [gender, setGender] = useState("Male");
  const [SSN, setSSN] = useState("000000");

  const [street, setStreet] = useState("112 Second");
  const [buildingOrApt, setBuildingOrApp] = useState("1222");
  const [city, setCity] = useState("Pleasanton");
  const [state, setState] = useState("CA");
  const [zip, setZip] = useState("666666");

  const [email, setEmail] = useState("example@example.com");
  const [cellPhone, setCellPhone] = useState("122-222-2221");
  const [workingPhone, setWorkingPhone] = useState("669-999-6666");

  const [visaType, setVisaType] = useState("OPT");
  const [visaStartDate, setVisaStartDate] = useState("2023-01-09");
  const [visaEndDate, setVisaEndDate] = useState("2024-01-08");

  const [emergencyContact1FirstName, setEmergencyContact1FirstName] =
    useState("John");
  const [emergencyContact1LastName, setEmergencyContact1LastName] =
    useState("Doe");
  const [emergencyContact1MiddleName, setEmergencyContact1MiddleName] =
    useState("Doe");
  const [emergencyContact1PhoneName, setEmergencyContact1PhoneName] =
    useState("000-222-333");
  const [emergencyContact1Email, setEmergencyContact1Email] = useState(
    "example@example.com"
  );
  const [emergencyContact1Relationship, setEmergencyContact1Relationship] =
    useState("friend");

  const [emergencyContact2FirstName, setEmergencyContact2FirstName] =
    useState("John");
  const [emergencyContact2LastName, setEmergencyContact2LastName] =
    useState("Doe");
  const [emergencyContact2MiddleName, setEmergencyContact2MiddleName] =
    useState("Doe");
  const [emergencyContact2PhoneName, setEmergencyContact2PhoneName] =
    useState("000-222-333");
  const [emergencyContact2Email, setEmergencyContact2Email] = useState(
    "example@example.com"
  );
  const [emergencyContact2Relationship, setEmergencyContact2Relationship] =
    useState("friend");

  const fileTable = [
    {
      name: "profile-image",
      modifiedTime: "Dec, 14, 2023",
      size: "5kb",
      src: "www.google.com",
    },
    {
      name: "driver-licence",
      modifiedTime: "Nov, 21, 2023",
      size: "18kb",
      src: "www.google.com",
    },
  ];

  return (
    <Container
      sx={{
        m: 8,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        Personal Details
      </Typography>
      <Stack spacing={5}>
        <Box
          sx={{
            position: "relative",
            width: 200,
            height: 200,
            m: 4,
          }}
        >
          <img
            src={userImage}
            alt="user's img"
            style={{ width: "200px", height: "200px" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white", // Circle color
              color: "black", // Icon color
              borderRadius: "50%", // Makes the Box a circle
              width: 40, // Width of the circle
              height: 40, // Height of the circle
            }}
          >
            <EditIcon />
          </Box>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Basic Info
            </Typography>
            <EditItem />
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={firstName}
                  label="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  value={middleName}
                  label="Middle Name"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  type="date"
                  value={DOB}
                  label="Date of Birth"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                />
                <TextField
                  value={SSN}
                  label="Social Security Number"
                  onChange={(e) => {
                    setSSN(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={lastName}
                  label="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  value={preferredName}
                  label="Preferred Name"
                  onChange={(e) => {
                    setPreferredName(e.target.value);
                  }}
                />
                <TextField
                  id="gender"
                  select
                  label="Gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"dontwish"}>
                    I do not wish to answer
                  </MenuItem>
                </TextField>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Address
            </Typography>
            <EditItem />
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={street}
                  label="Street"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
                <TextField
                  value={city}
                  label="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <TextField
                  value={zip}
                  label="Zip"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={buildingOrApt}
                  label="Building / Apt #"
                  onChange={(e) => {
                    setBuildingOrApp(e.target.value);
                  }}
                />
                <TextField
                  value={state}
                  label="State"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Contact
            </Typography>
            <EditItem />
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                value={email}
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                value={cellPhone}
                label="Cell Phone"
                onChange={(e) => {
                  setCellPhone(e.target.value);
                }}
              />
              <TextField
                value={workingPhone}
                label="Working Phone"
                onChange={(e) => {
                  setWorkingPhone(e.target.value);
                }}
              />
            </Stack>
          </Grid>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Employment
            </Typography>
            <EditItem />
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                id="visatype"
                select
                value={visaType}
                label="Visa Type"
                onChange={(e) => {
                  setVisaType(e.target.value);
                }}
              >
                <MenuItem value={"OPT"}>OPT</MenuItem>
                <MenuItem value={"H1B"}>H1B</MenuItem>
              </TextField>

              <TextField
                variant="outlined"
                type="date"
                value={visaStartDate}
                label="Start Date"
                onChange={(e) => {
                  setVisaStartDate(e.target.value);
                }}
              />
              <TextField
                variant="outlined"
                type="date"
                value={visaEndDate}
                label="End Date"
                onChange={(e) => {
                  setVisaEndDate(e.target.value);
                }}
              />
            </Stack>
          </Grid>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Emergency Contact 1
            </Typography>
            <EditItem />
          </Container>
          <Box>
            <Typography variant="h6" sx={{ m: 3 }}>
              Person 1
            </Typography>
            <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={emergencyContact1FirstName}
                    label="First Name"
                    onChange={(e) => {
                      setEmergencyContact1FirstName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact1MiddleName}
                    label="Middle Name"
                    onChange={(e) => {
                      setEmergencyContact1MiddleName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact1PhoneName}
                    label="phone"
                    onChange={(e) => {
                      setEmergencyContact1PhoneName(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={emergencyContact1LastName}
                    label="Last Name"
                    onChange={(e) => {
                      setEmergencyContact1LastName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact1Email}
                    label="Email"
                    onChange={(e) => {
                      setEmergencyContact1Email(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact1Relationship}
                    label="Relationship"
                    onChange={(e) => {
                      setEmergencyContact1Relationship(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ m: 3 }}>
              Person 2
            </Typography>
            <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={emergencyContact2FirstName}
                    label="First Name"
                    onChange={(e) => {
                      setEmergencyContact2FirstName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact2MiddleName}
                    label="Middle Name"
                    onChange={(e) => {
                      setEmergencyContact2MiddleName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact2PhoneName}
                    label="phone"
                    onChange={(e) => {
                      setEmergencyContact2PhoneName(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={emergencyContact2LastName}
                    label="Last Name"
                    onChange={(e) => {
                      setEmergencyContact2LastName(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact2Email}
                    label="Email"
                    onChange={(e) => {
                      setEmergencyContact2Email(e.target.value);
                    }}
                  />
                  <TextField
                    value={emergencyContact2Relationship}
                    label="Relationship"
                    onChange={(e) => {
                      setEmergencyContact2Relationship(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            m: 2,
            pb: 4,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "70%",
            border: "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Typography variant="h5" sx={{ m: 2 }}>
            Summary of Uploaded Files
          </Typography>
          <Box sx={{ m: 2 }}>
            {" "}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Last modified
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Size
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Download
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Preview
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileTable.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
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
        </Box>
      </Stack>
    </Container>
  );
}
