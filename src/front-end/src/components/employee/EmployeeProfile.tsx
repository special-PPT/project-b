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
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import userImage from "./dashboard/user.png";
import Document from "./common/Document";
import { useState, useEffect } from "react";
import EditButton from "./common/EditButton";
import FileUploadButton from "./common/UploadFileButton";
import { useCookies } from 'react-cookie';

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// SSN validation function (format XXX-XX-XXXX)
const validateSSN = (ssn: string): boolean => {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(ssn);
};




interface DocumentSub {
  name: string;
  updatedAt: string;
  size: string;         // Make sure this property exists
  url: string;
  documentKey: string;
  type: string;
}

interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

interface PersonalInformation {
  userID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePicture?: string;
  email: string;
  ssn: string;
  address: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumbers: {
    cell: string;
    work?: string;
  };
  dateOfBirth: Date;
  gender: string;
  emergencyContacts: EmergencyContact[];
  workAuth: string;
  documents: DocumentSub[];
}


export default function EmployeeProfile() {
  const [cookies] = useCookies(['userId', 'email']);
  const userId = cookies.userId;
  const email = cookies.email;
  console.log(email);

  const [personalInfoData, setPersonalInfoData] = useState<PersonalInformation | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [editModes, setEditModes] = useState<{ [key: string]: boolean; }>({
    basicInfo: false,
    address: false,
    contact: false,
    employment: false,
    emergencyContact: false,
  });

  const toggleEditMode = (section: string) => {
    setEditModes(prevModes => ({
      ...prevModes,
      [section]: !prevModes[section],
    }));
  };

  const fileTable = [
    {
      name: "Receipt",
      updatedAt: "Dec, 14, 2023",
      size: "5kb",
      url: "www.google.com",
      documentKey: "12323123",
      type: "Receipt"
    },
    {
      name: "driver-licence",
      updatedAt: "Nov, 21, 2023",
      size: "18kb",
      url: "www.google.com",
      documentKey: "12323123",
      type: "Driver License"
    },
  ];

  const isMobile = useMediaQuery("(max-width:1000px)");

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [middleName, setMiddleName] = useState("Yash");
  const [preferredName, setPreferredName] = useState("");
  const [DOB, setDOB] = useState("2000-01-09");
  const [gender, setGender] = useState("male");
  const [SSN, setSSN] = useState("000000");

  const [street, setStreet] = useState("112 Second");
  const [buildingOrApt, setBuildingOrApp] = useState("1222");
  const [city, setCity] = useState("Pleasanton");
  const [state, setState] = useState("CA");
  const [zip, setZip] = useState("666666");

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

  const [profilePicture, setProfilePicture] = useState('path-to-file');
  const [documents, setDocuments] = useState(fileTable);

  const [emailValid, setEmailValid] = useState(true);
  const [ssnValid, setSsnValid] = useState(true);


  useEffect(() => {
    const fetchPersonalInfoData = async () => {
      try {
        console.log(userId);
        const response = await fetch(`http://localhost:8000/personalInfo/get/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (!response.ok) {
          setAlertMessage(`HTTP error! status: ${response.status}`);
          return;
        }
        const data = await response.json() as PersonalInformation;
        // Now, set the form fields based on the fetched data
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setMiddleName(data.middleName || ""); // Use || to handle potentially undefined values
        setPreferredName(data.preferredName || "");
        setDOB(data.dateOfBirth ? data.dateOfBirth.toString().split('T')[0] : ""); // Format date
        setGender(data.gender);
        // Continue for other fields...

        // Address fields
        if (data.address) {
          setStreet(data.address.street);
          setBuildingOrApp(data.address.building);
          setCity(data.address.city);
          setState(data.address.state);
          setZip(data.address.zip);
        }

        // Phone numbers
        if (data.phoneNumbers) {
          setCellPhone(data.phoneNumbers.cell);
          setWorkingPhone(data.phoneNumbers.work || "");
        }

        // Assuming you handle emergency contacts similarly
        if (data.emergencyContacts && data.emergencyContacts.length > 0) {
          // Update fields for the first emergency contact
          const ec1 = data.emergencyContacts[0];
          setEmergencyContact1FirstName(ec1.firstName);
          setEmergencyContact1LastName(ec1.lastName);
          setEmergencyContact1MiddleName(ec1.middleName || "");
          setEmergencyContact1PhoneName(ec1.phone);
          setEmergencyContact1Email(ec1.email);
          setEmergencyContact1Relationship(ec1.relationship);
        }

        if (data.profilePicture) {
          setProfilePicture(data.profilePicture);
        }

        setVisaType(data.workAuth);

        if (data.documents) {
          setDocuments(data.documents);
        }
        setSSN(data.ssn);



      } catch (e) {
        if (e instanceof Error) {
          setAlertMessage(e.message);
        } else {
          setAlertMessage('An unknown error occurred');
        }
      }
    };

    fetchPersonalInfoData();
    console.log(personalInfoData);

  }, []);


  const handleSubmitProfile = async () => {
    const personalInfo: PersonalInformation = {
      userID: userId,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      preferredName: preferredName,
      // Assuming you have a way to set profilePicture
      profilePicture: profilePicture,
      email: email,
      address: {
        building: buildingOrApt,
        street: street,
        city: city,
        state: state,
        zip: zip,
      },
      ssn: SSN,
      phoneNumbers: {
        cell: cellPhone,
        work: workingPhone,
      },
      dateOfBirth: new Date(DOB),
      gender: gender,
      emergencyContacts: [
        {
          firstName: emergencyContact1FirstName,
          lastName: emergencyContact1LastName,
          middleName: emergencyContact1MiddleName,
          phone: emergencyContact1PhoneName,
          email: emergencyContact1Email,
          relationship: emergencyContact1Relationship
        },
        {
          firstName: emergencyContact2FirstName,
          lastName: emergencyContact2LastName,
          middleName: emergencyContact2MiddleName,
          phone: emergencyContact2PhoneName,
          email: emergencyContact2Email,
          relationship: emergencyContact2Relationship
        }
      ],
      workAuth: visaType,
      // Assuming documents are handled separately
      documents: fileTable as DocumentSub[],
    };

    try {
      const response = await fetch(`http://localhost:8000/personalInfo/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(personalInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile updated successfully", data);
      setAlertMessage("Profile updated successfully!");
    } catch (e) {
      if (e instanceof Error) {
        console.error("Failed to update profile", e.message);
        setAlertMessage(e.message);
      } else {
        console.error("An unknown error occurred");
        setAlertMessage("An unknown error occurred");
      }
    }
  };

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
            display: 'flex',
            position: "relative",
            width: 200,
            height: 200,
            m: 4,
          }}
        >
          <img
            src={profilePicture ? profilePicture : userImage}
            alt="user's img"
            style={{ width: "200px", height: "200px" }}
          />
          <Box>
            <FileUploadButton documentType="image" status="submitted" />
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
            <EditButton onClick={() => toggleEditMode('basicInfo')} />
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  required
                  value={firstName}
                  label="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);

                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
                <TextField
                  value={middleName}
                  label="Middle Name"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
                <TextField
                  required
                  variant="outlined"
                  type="date"
                  value={DOB}
                  label="Date of Birth"
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
                <TextField
                  required
                  error={!ssnValid}
                  helperText={!ssnValid ? "Please enter a valid SSN (XXX-XX-XXXX)." : ""}
                  value={SSN}
                  label="Social Security Number"
                  onChange={(e) => {
                    setSSN(e.target.value);
                    setSsnValid(validateSSN(e.target.value));

                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  required
                  value={lastName}
                  label="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
                <TextField
                  value={preferredName}
                  label="Preferred Name"
                  onChange={(e) => {
                    setPreferredName(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
                  }}
                />
                <TextField
                  required
                  id="gender"
                  select
                  label="Gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.basicInfo,
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
            <EditButton onClick={() => toggleEditMode('address')} />
          </Container>

          <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  required
                  value={street}
                  label="Street"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.address,
                  }}
                />
                <TextField
                  required
                  value={city}
                  label="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.address,
                  }}
                />
                <TextField
                  required
                  value={zip}
                  label="Zip"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.address,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  required
                  value={buildingOrApt}
                  label="Building / Apt #"
                  onChange={(e) => {
                    setBuildingOrApp(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.address,
                  }}
                />
                <TextField
                  required
                  value={state}
                  label="State"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  InputProps={{
                    readOnly: !editModes.address,
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
            <EditButton onClick={() => toggleEditMode('contact')} />
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                required
                error={!emailValid}
                helperText={!emailValid ? "Please enter a valid email." : ""}

                value={email}
                label="Email"
                onChange={(e) => {
                  setEmailValid(validateEmail(e.target.value));
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                required
                value={cellPhone}
                label="Cell Phone"
                onChange={(e) => {
                  setCellPhone(e.target.value);
                }}
                InputProps={{
                  readOnly: !editModes.contact,
                }}
              />
              <TextField
                value={workingPhone}
                label="Working Phone"
                onChange={(e) => {
                  setWorkingPhone(e.target.value);
                }}
                InputProps={{
                  readOnly: !editModes.contact,
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
            <EditButton onClick={() => toggleEditMode('employment')} />
          </Container>
          <Grid item xs={12} sm={6} sx={{ px: 3 }}>
            <Stack spacing={2}>
              <TextField
                required
                id="visatype"
                select
                value={visaType}
                label="Visa Type"
                onChange={(e) => {
                  setVisaType(e.target.value);
                }}
                InputProps={{
                  readOnly: !editModes.employment,
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
                InputProps={{
                  readOnly: !editModes.employment,
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
                InputProps={{
                  readOnly: !editModes.employment,
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
            <EditButton onClick={() => toggleEditMode('emergencyContact')} />
          </Container>
          <Box>
            <Typography variant="h6" sx={{ m: 3 }}>
              Person 1
            </Typography>
            <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    required
                    value={emergencyContact1FirstName}
                    label="First Name"
                    onChange={(e) => {
                      setEmergencyContact1FirstName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    value={emergencyContact1MiddleName}
                    label="Middle Name"
                    onChange={(e) => {
                      setEmergencyContact1MiddleName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact1PhoneName}
                    label="phone"
                    onChange={(e) => {
                      setEmergencyContact1PhoneName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    required
                    value={emergencyContact1LastName}
                    label="Last Name"
                    onChange={(e) => {
                      setEmergencyContact1LastName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact1Email}
                    label="Email"
                    onChange={(e) => {
                      setEmergencyContact1Email(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact1Relationship}
                    label="Relationship"
                    onChange={(e) => {
                      setEmergencyContact1Relationship(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
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
                    required
                    value={emergencyContact2FirstName}
                    label="First Name"
                    onChange={(e) => {
                      setEmergencyContact2FirstName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    value={emergencyContact2MiddleName}
                    label="Middle Name"
                    onChange={(e) => {
                      setEmergencyContact2MiddleName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact2PhoneName}
                    label="phone"
                    onChange={(e) => {
                      setEmergencyContact2PhoneName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <TextField
                    required
                    value={emergencyContact2LastName}
                    label="Last Name"
                    onChange={(e) => {
                      setEmergencyContact2LastName(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact2Email}
                    label="Email"
                    onChange={(e) => {
                      setEmergencyContact2Email(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
                    }}
                  />
                  <TextField
                    required
                    value={emergencyContact2Relationship}
                    label="Relationship"
                    onChange={(e) => {
                      setEmergencyContact2Relationship(e.target.value);
                    }}
                    InputProps={{
                      readOnly: !editModes.emergencyContact,
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
            {isMobile ? (
              <>
                {documents.map((doc, index) => (
                  <Document
                    key={index}
                    documentName={doc.name ? doc.name : 'example'}
                    lastModifiedDate={doc.updatedAt ? doc.updatedAt : 'Dec 05 2023'}
                    documentSize={doc.size ? doc.size : '10kb'}
                    canDownload={true}
                    canPreview={true}
                    documentUrl={doc.url ? doc.url : 'www.google.com'}
                  />
                ))}
              </>
            ) : (
              <>
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
                            {row.name ? row.name : 'exampleTab'}
                          </TableCell>
                          <TableCell align="right">{row.updatedAt ? row.updatedAt : 'Dec 06 2022'}</TableCell>
                          <TableCell align="right">{row.size ? row.size : '9kb'}</TableCell>
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
              </>
            )}

          </Box>


        </Box>
      </Stack>
      <Button sx={{
        color: "white",
        backgroundColor: "#3a4d8f",
        width: '50%',
        fontSize: 20,
        "&:hover": {
          backgroundColor: "darkblue",
        },
        border: "1px solid #3a4d8f",
        mt: 4,
        // ml: 20
      }} onClick={handleSubmitProfile}>Submit</Button>
    </Container >
  );
}
