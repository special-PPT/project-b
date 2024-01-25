import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  MenuItem,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  transformPersonalDetails,
  transformProfileDocuments,
} from "../data/hiring/hiringDataTransformUtils";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";

export default function HrEmployeeApplication() {
  const { employeeId } = useParams();
  const effectiveEmployeeId = employeeId ? employeeId : "";
  console.log("effectiveEmployeeId: ", effectiveEmployeeId);
  const employees = useTypedSelector((state) => state.hr.employees);
  console.log("employees: ", employees);
  const employee = employees[effectiveEmployeeId];
  console.log("employee: ", employee);
  if (employee === undefined) {
    return <p>Something went wrong... plase try again...</p>;
  }

  const [employeeData, documents] = [
    transformPersonalDetails(employee),
    transformProfileDocuments(employee.personalInformation.documents),
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
            src={employeeData.personalProfile.profilePicture}
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
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={employeeData.personalProfile.firstName}
                  label="First Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.middleName}
                  label="Middle Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="outlined"
                  type="date"
                  value={employeeData.personalProfile.DOB}
                  label="Date of Birth"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.SSN}
                  label="Social Security Number"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={employeeData.personalProfile.lastName}
                  label="Last Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.preferredName}
                  label="Preferred Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="gender"
                  select
                  label="Gender"
                  value={employeeData.personalProfile.gender}
                  sx={{ width: "100%" }}
                  InputProps={{
                    readOnly: true,
                  }}
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
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={employeeData.personalProfile.street}
                  label="Street"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.city}
                  label="City"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.zip}
                  label="Zip"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  value={employeeData.personalProfile.buildingOrApt}
                  label="Building / Apt #"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={employeeData.personalProfile.state}
                  label="State"
                  InputProps={{
                    readOnly: true,
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
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                value={employeeData.personalProfile.email}
                label="Email"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={employeeData.personalProfile.cellPhone}
                label="Cell Phone"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={employeeData.personalProfile.workingPhone}
                label="Working Phone"
                InputProps={{
                  readOnly: true,
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
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                id="visatype"
                select
                value={employeeData.personalProfile.visaType}
                label="Visa Type"
                InputProps={{
                  readOnly: true,
                }}
              >
                <MenuItem value={"F1(CPT/OPT)"}>F1(CPT/OPT)</MenuItem>
                <MenuItem value={"H1B"}>H1B</MenuItem>
                <MenuItem value={"L2"}>L2</MenuItem>
                <MenuItem value={"H4"}>H4</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </TextField>

              <TextField
                variant="outlined"
                type="date"
                value={employeeData.personalProfile.visaStartDate}
                label="Start Date"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                variant="outlined"
                type="date"
                value={employeeData.personalProfile.visaEndDate}
                label="End Date"
                InputProps={{
                  readOnly: true,
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
          </Container>
          <Box>
            <Typography variant="h6" sx={{ m: 3 }}>
              Person 1
            </Typography>
            <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={employeeData.contacts[0].firstName}
                    label="First Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[0].middleName}
                    label="Middle Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[0].phoneName}
                    label="phone"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={employeeData.contacts[0].lastName}
                    label="Last Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[0].email}
                    label="Email"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[0].relationship}
                    label="Relationship"
                    InputProps={{
                      readOnly: true,
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
                    value={employeeData.contacts[1].firstName}
                    label="First Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[1].middleName}
                    label="Middle Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[1].phoneName}
                    label="phone"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    value={employeeData.contacts[1].lastName}
                    label="Last Name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[1].email}
                    label="Email"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    value={employeeData.contacts[1].relationship}
                    label="Relationship"
                    InputProps={{
                      readOnly: true,
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
                  {documents.map((row) => (
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
        {/* TODO: */}
        {/* <DecisionButtons big˜gerButton={true}/> */}
      </Stack>
    </Container>
  );
}
