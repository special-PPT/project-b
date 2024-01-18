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
import {
  employeeData,
  personalDetailsField1,
  personalDetailsField2,
  addressField1,
  addressField2,
  contactFields,
  employmentFields,
  emergencyContact1Fields1,
  emergencyContact1Fields2,
} from "../data/EmployeeAppData";
import { employeeProfileStyles } from "../../../styles/hr/employeeProfileStyle";

export default function HrEmployeeApplication() {
  const fileTable = [
    { name: "profile-image", modifiedTime: "Dec, 14, 2023", size: "5kb" },
    { name: "driver-licence", modifiedTime: "Nov, 21, 2023", size: "18kb" },
  ];

  return (
    <Container sx={employeeProfileStyles.containerMargin}>
      <Typography variant="h3" sx={employeeProfileStyles.marginBottom}>
        Personal Details
      </Typography>
      <Stack spacing={5}>
        <Box sx={employeeProfileStyles.imageBox}>
          <img
            src="https://wallpapers-clan.com/wp-content/uploads/2023/06/sad-ghost-dark-blue-background.jpg"
            alt="user's img"
            style={{ width: "200px", height: "200px" }}
          />
          <Box sx={employeeProfileStyles.editIconBox}>
            <EditIcon />
          </Box>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Basic Info
            </Typography>
          </Container>

          <Grid container spacing={4} sx={employeeProfileStyles.gridPadding}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                {personalDetailsField1.map((field) => (
                  <TextField
                    key={field.key}
                    value={employeeData.personalDetails[field.key]}
                    label={field.label}
                    type={field.type || "text"}
                    InputProps={{ readOnly: true }}
                    variant={field.type === "date" ? "outlined" : "standard"}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                {personalDetailsField2.map((field) => (
                  <TextField
                    key={field.key}
                    value={employeeData.personalDetails[field.key]}
                    label={field.label}
                    type={field.type || "text"}
                    InputProps={{ readOnly: true }}
                    variant={field.type === "date" ? "outlined" : "standard"}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Address
            </Typography>
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                {addressField1.map((field) => (
                  <TextField
                    key={field.key}
                    value={employeeData.personalDetails[field.key]}
                    label={field.label}
                    type={field.type || "text"}
                    InputProps={{ readOnly: true }}
                    variant={field.type === "date" ? "outlined" : "standard"}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                {addressField2.map((field) => (
                  <TextField
                    key={field.key}
                    value={employeeData.personalDetails[field.key]}
                    label={field.label}
                    type={field.type || "text"}
                    InputProps={{ readOnly: true }}
                    variant={field.type === "date" ? "outlined" : "standard"}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Contact
            </Typography>
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              {contactFields.map((field) => (
                <TextField
                  key={field.key}
                  value={employeeData.personalDetails[field.key]}
                  label={field.label}
                  type={field.type || "text"}
                  InputProps={{ readOnly: true }}
                  variant={field.type === "date" ? "outlined" : "standard"}
                />
              ))}
            </Stack>
          </Grid>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
          <Container>
            <Typography variant="h5" sx={{ m: 2 }}>
              Employment
            </Typography>
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              {employmentFields.map((field) => (
                <TextField
                  key={field.key}
                  value={employeeData.personalDetails[field.key]}
                  label={field.label}
                  type={field.type || "text"}
                  InputProps={{ readOnly: true }}
                  variant={field.type === "date" ? "outlined" : "standard"}
                />
              ))}
            </Stack>
          </Grid>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
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
                  {emergencyContact1Fields1.map((field) => (
                    <TextField
                      key={field.key}
                      value={employeeData.emergencyContacts[0][field.key]}
                      label={field.label}
                      InputProps={{ readOnly: true }}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  {emergencyContact1Fields2.map((field) => (
                    <TextField
                      key={field.key}
                      value={employeeData.emergencyContacts[0][field.key]}
                      label={field.label}
                      InputProps={{ readOnly: true }}
                    />
                  ))}
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
                  {emergencyContact1Fields1.map((field) => (
                    <TextField
                      key={field.key}
                      value={employeeData.emergencyContacts[1][field.key]}
                      label={field.label}
                      InputProps={{ readOnly: true }}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  {emergencyContact1Fields2.map((field) => (
                    <TextField
                      key={field.key}
                      value={employeeData.emergencyContacts[1][field.key]}
                      label={field.label}
                      InputProps={{ readOnly: true }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={employeeProfileStyles.detailBox}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Summary of Uploaded Files
          </Typography>
          <Box sx={{ m: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {[
                      "Name",
                      "Last modified",
                      "Size",
                      "Download",
                      "Preview",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{ fontWeight: "bold" }}
                        align={header === "Name" ? "inherit" : "right"}
                      >
                        {header}
                      </TableCell>
                    ))}
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
        </Box>
      </Stack>
    </Container>
  );
}
