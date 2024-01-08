import * as React from "react";
import { Tabs, Tab, Box, Typography, Stack, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { alpha } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  fileSubmitted: boolean;
  feedback: String;
  isApproved: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, fileSubmitted, feedback, isApproved } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {!fileSubmitted && (
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
              <Button variant="contained" component="label">
                Browser
                <input type="file" hidden />
              </Button>
            </Stack>
          </Box>
          <Box sx={{m: 2}}>
            <Button
              sx={{
                color: "black",
                width: 100,
                backgroundColor: "white",
                mr: 4,
                border: "1px solid #3a4d8f",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#3a4d8f",
                width: 100,
                "&:hover": {
                  backgroundColor: "darkblue",
                },
                border: "1px solid #3a4d8f",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
      {fileSubmitted && value === index && (
        <Box
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
              <Typography>sample_code.pdf</Typography>
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
              <Button>
                <DownloadIcon />
              </Button>
              <Button>
                <RemoveRedEyeIcon />
              </Button>
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
              <Typography sx={{ m: 4 }}>{feedback}</Typography>
            </Box>
          </Box>
          <Box sx={{ position: "relative", p: 3 }}>
            {isApproved ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  color: "green",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <Typography>Approved</Typography>
                <CheckIcon />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  color: "red",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <Typography>Rejected</Typography>
                <ErrorOutlineIcon />
              </Box>
            )}
          </Box>
        </Box>
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
  const [value, setValue] = React.useState(0);
  const userVisaType: String = "OPT";
  const fileSubmitted: boolean = false;
  const feedback: String =
    "Name is not consistent, please change to your legal name";
  const isApproved: boolean = false;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (userVisaType !== "OPT") {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Receipt" {...a11yProps(0)} />
          <Tab label="EAD" {...a11yProps(1)} disabled />
          <Tab label="I-983" {...a11yProps(2)} disabled />
          <Tab label="I-20" {...a11yProps(3)} disabled />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
        fileSubmitted={fileSubmitted}
        feedback={feedback}
        isApproved={isApproved}
      ></CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
        fileSubmitted={fileSubmitted}
        feedback={feedback}
        isApproved={isApproved}
      >
        Item Two
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
        fileSubmitted={fileSubmitted}
        feedback={feedback}
        isApproved={isApproved}
      >
        Item Three
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={3}
        fileSubmitted={fileSubmitted}
        feedback={feedback}
        isApproved={isApproved}
      >
        Item Four
      </CustomTabPanel>
    </Box>
  );
}
