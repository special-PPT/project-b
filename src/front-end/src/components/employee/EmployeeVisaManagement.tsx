import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Stack, Button, Container, useMediaQuery, Card, CardHeader, Chip, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { alpha } from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import FileUploadButton from "./common/UploadFileButton";
import Document from "./common/Document";
import { CheckCircle, Warning, HourglassEmpty } from '@mui/icons-material';
import { green, red, yellow, grey } from '@mui/material/colors';
import PreviewIcon from "@mui/icons-material/Preview";
import theme from "../../theme";
import { useCookies } from "react-cookie";

// Define the shape of the props according to your document structure
interface DocStatusProps {
  doc: {
    status: string;
  };
}

const DocStatus: React.FC<DocStatusProps> = ({ doc }) => {
  const getStatusChip = () => {
    switch (doc.status) {
      case 'Approved':
        return (
          <Chip
            icon={<CheckCircle />}
            label="Approved"
            sx={{ color: 'white', bgcolor: green[500], fontWeight: 'bold' }}
          />
        );
      case 'Rejected':
        return (
          <Chip
            icon={<Warning />}
            label="Rejected"
            sx={{ color: 'white', bgcolor: red[500], fontWeight: 'bold' }}
          />
        );
      case 'Pending':
        return (
          <Chip
            icon={<HourglassEmpty />}
            label="Pending"
            sx={{ color: 'white', bgcolor: yellow[800], fontWeight: 'bold' }}
          />
        );
      default:
        return (
          <Chip
            label="Unknown Status"
            sx={{ color: 'white', bgcolor: grey[500], fontWeight: 'bold' }}
          />
        );
    }
  };

  return (
    <Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      {getStatusChip()}
    </Typography>
  );
};

enum DocumentStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  NotSubmitted = "Not_Submitted"
}

interface DocumentSub {
  type: string;
  url: string;
  status: string;
  name: string;
  documentKey?: string;
  feedback?: string;
}

interface VisaStatusData {
  userID: string;
  visaType: string;
  status: string;
  startDate: Date;
  endDate: Date;
  documents: DocumentSub[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  document: DocumentSub;
}

const documentTypes = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

const initializeDocuments = (existingDocuments: DocumentSub[]): DocumentSub[] => {
  return documentTypes.map(type => {
    const foundDoc = existingDocuments.find(doc => doc.type === type);
    if (foundDoc) return foundDoc;

    // If a document of a specific type is not found, create a default one
    return {
      type: type,
      // docType: type, 
      url: '',
      status: 'Not_Submitted',
      name: '',
      documentKey: '',
      feedback: ''
    };
  });
};

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, document } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {document.status === DocumentStatus.NotSubmitted ? (
        <Box
          sx={{
            width: 600,
            border: "2px solid rgba(0, 0, 0, 0.2)",
            p: 4,
          }}
        >
          <Box
            sx={{
              border: "2px dashed rgba(0, 0, 0, 0.2)",
              backgroundColor: alpha("#A1C1FF", 0.5),
              py: 10,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                width: 600,
              }}
            >
              <UploadFileIcon fontSize="large" />
              <Typography>Drag and drop here</Typography>
            </Stack>
          </Box>
          <FileUploadButton documentType={document.type} status='Pending'/>
        </Box>
      ) : (
        <><Box
          sx={{
            width: 600,
            border: "2px dashed rgba(0, 0, 0, 0.2)",
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              position: "relative",
              m: 3,
              border: "2px dashed rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>Uploaded Doc:</Typography>
              <Typography>{document.name}</Typography>
            </Box>
            <Stack
              sx={{
                mr: 2,
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                spacing: 4,
                bottom: 0,
                right: 0,
              }}
            >
              <IconButton href={document.url} download>
            <DownloadIcon sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
          <IconButton onClick={() => window.open(document.url, '_blank')}>
            <PreviewIcon sx={{ color: theme.palette.primary.dark }} />
          </IconButton>


            </Stack>
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>FeedBack</Typography>
            <Box
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                boxShadow: 4,
              }}
            >
              <Typography sx={{ m: 4 }}>{document.feedback}</Typography>
            </Box>
          </Box>
          <Box sx={{ position: "relative", p: 3 }}>
            <DocStatus doc={document}/>
          </Box>
          {document.status === DocumentStatus.Rejected && (
            <>
              <FileUploadButton documentType={document.type} status={document.status}/>
            </>

          )}
        </Box></>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EmployeeVisaManagement() {
  const [currentTab, setCurrentTab] = useState(0);
  const [visaStatusData, setVisaStatusData] = useState<VisaStatusData | null>(null);
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const initializedDocuments: DocumentSub[] = initializeDocuments(visaStatusData?.documents ?? []);
  const isMobile = useMediaQuery("(max-width:700px)");


  useEffect(() => {
    const fetchVisaStatusData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/visa/${userId}`);
        if (!response.ok) {
          setAlertMessage(`HTTP error! status: ${response.status}`);
          return;
        }
        const data = await response.json() as VisaStatusData;
        setVisaStatusData(data);
      } catch (e) {
        if (e instanceof Error) {
          setAlertMessage(e.message);
        } else {
          setAlertMessage('An unknown error occurred');
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchVisaStatusData();
    console.log(visaStatusData);

  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // const handleDocumentUpload = (documentType, file) => {

  // };

  if (visaStatusData?.visaType !== "F1(CPT/OPT)") {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <Container maxWidth="sm" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '30px',
      marginBottom: '40px'
      // height: '100vh'
    }}>
      <Typography variant="h5">OPT Work Authorization Documents</Typography>
      {isMobile ? (
        <>
          <Box>
            {visaStatusData.documents.map((doc, index) => (
              <Box gap={5} sx={{
                marginTop: '40px',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{documentTypes[index]}</Typography>
                <Document
                  key={index}
                  documentName={doc.name}
                  lastModifiedDate={Date()}
                  documentSize='5kb'
                  canDownload={true}
                  canPreview={true}
                  documentUrl={doc.url}
                />
                <Box sx={{
                  display: 'flex',
                  ml: 4,
                  mt: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <Box >
                    <DocStatus doc={{ status: doc.status }} />
                    <Typography variant="caption">{doc.feedback}</Typography>
                  </Box>
                  {/* <Box>
                <Typography sx={{
                  fontSize: '1rem'
                }}>Submitted</Typography>
              </Box> */}
                </Box>



                {doc.status === "Rejected" && (
                  <FileUploadButton documentType={documentTypes[index]} status="Pending" />
                )}
                <Divider sx={{
                  mt: '20px'
                }}/>
              </Box>


            ))}
            {visaStatusData.documents.length > 0 && visaStatusData.documents.length < 4 && visaStatusData.documents[visaStatusData.documents.length - 1].status === "Approved" && (
              <Box gap={5} sx={{
                marginTop: '40px',
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{documentTypes[visaStatusData.documents.length]}</Typography>
                <FileUploadButton documentType={documentTypes[visaStatusData.documents.length]} status="Pending" />
              </Box>
            )}
          </Box>

        </>
      ) : (
        <>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="Document tabs"
              >
                <Tab label="Receipt" {...a11yProps(0)} />
                <Tab label="EAD" {...a11yProps(1)} disabled={initializedDocuments[0]?.status !== DocumentStatus.Approved} />
                <Tab label="I-983" {...a11yProps(2)} disabled={initializedDocuments[1]?.status !== DocumentStatus.Approved} />
                <Tab label="I-20" {...a11yProps(3)} disabled={initializedDocuments[2]?.status !== DocumentStatus.Approved} />
              </Tabs>
            </Box>
            {
              initializedDocuments.map((doc, index) => {
                return (
                  <CustomTabPanel
                    key={doc.type}
                    value={currentTab}
                    index={index}
                    document={doc}
                  />
                )
              })
            }
          </Box>
        </>
      )}

    </Container>

  );
}
