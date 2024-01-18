import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import FileTable from "../common/FileTable";
import { TextFieldGroupProps, sections } from "../data/EmployeeAppData";
import { employeeProfileStyles } from "../../../styles/hr/employeeProfileStyle";
import DecisionButtons from "../common/FileDecision";

export default function HrEmployeeApplication() {
  const fileTable = [
    { name: "profile-image", modifiedTime: "Dec, 14, 2023", size: "5kb" },
    { name: "driver-licence", modifiedTime: "Nov, 21, 2023", size: "18kb" },
  ];

  const TextFieldGroup: React.FC<TextFieldGroupProps> = ({
    fields,
    data,
    sx = {},
  }) => (
    <Grid item xs={12} sm={6} sx={sx}>
      <Stack spacing={2}>
        {fields.map((field) => (
          <TextField
            key={field.key}
            value={data[field.key as keyof typeof data]}
            label={field.label}
            InputProps={{ readOnly: true }}
          />
        ))}
      </Stack>
    </Grid>
  );

  return (
    <Container sx={employeeProfileStyles.containerMargin}>
      <Typography variant="h5" sx={employeeProfileStyles.marginBottom}>
        Personal Details
      </Typography>
      <Stack spacing={5}>
        <Box sx={employeeProfileStyles.imageBox}>
          <img
            src="https://wallpapers-clan.com/wp-content/uploads/2023/06/sad-ghost-dark-blue-background.jpg"
            alt="user's img"
            style={{ width: "200px", height: "200px" }}
          />
        </Box>
        {sections.map((section, index) => (
          <Box key={index} sx={employeeProfileStyles.detailBox}>
            <Container>
              <Typography variant="h5" sx={{ m: 2 }}>
                {section.title}
              </Typography>
            </Container>
            <Grid
              container
              spacing={4}
              sx={employeeProfileStyles.gridPadding || section.sx}
            >
              {section.fields.map((fieldArray, idx) => (
                <TextFieldGroup
                  key={idx}
                  fields={fieldArray}
                  data={section.data}
                />
              ))}
            </Grid>
          </Box>
        ))}
        <Box sx={employeeProfileStyles.detailBox}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Summary of Uploaded Files
          </Typography>
          <FileTable fileTable={fileTable} />
        </Box>
        <DecisionButtons biggerButton={true}/>
      </Stack>
    </Container>
  );
}
