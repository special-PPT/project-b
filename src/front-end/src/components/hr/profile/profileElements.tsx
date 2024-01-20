import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Document from "../common/Document";
import {
  EmployeeDataInterface,
  DocumentInterface,
} from "../data/EmployeeDataInterfaces";

interface InfoBoxProps {
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ children }) => (
  <Box
    sx={{
      paddingLeft: "10px",
      width: "90%",
      display: "grid",
      gridTemplateColumns: "1.5fr 2fr",
      textAlign: "left",
      gap: 1,
    }}
  >
    {children}
  </Box>
);

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: "bold",
      gridColumn: "1 / -1",
      fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
    }}
  >
    {title.toUpperCase()}
  </Typography>
);

interface InfoEntryProps {
  label: string;
  value: string;
}

const InfoEntry: React.FC<InfoEntryProps> = ({ label, value }) => (
  <React.Fragment>
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: "regular",
        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
      }}
    >
      {label.toUpperCase()}:
    </Typography>
    <Typography
      sx={{
        wordBreak: "break-all",
        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
      }}
    >
      {value}
    </Typography>
  </React.Fragment>
);

// used in ProfileScreen
interface ElementProps {
  employeeData: EmployeeDataInterface | null;
}

const Element10: React.FC<ElementProps> = ({ employeeData }) => {
  if (!employeeData || !employeeData.basic_info) {
    return <div>No data available</div>;
  }

  return (
    <InfoBox>
      {Object.entries(employeeData.basic_info).map(([key, value]) => (
        <InfoEntry key={key} label={key.replace(/_/g, " ")} value={value} />
      ))}
    </InfoBox>
  );
};

const Element01: React.FC<ElementProps> = ({ employeeData }) => {
  if (!employeeData) {
    return <div>No data available</div>;
  }

  return (
    <InfoBox>
      {/* Address */}
      <SectionTitle title="Address" />
      {employeeData.address &&
        Object.entries(employeeData.address).map(([key, value]) => (
          <InfoEntry key={key} label={key.replace(/_/g, " ")} value={value} />
        ))}

      {/* Contact */}
      <SectionTitle title="Contact" />
      {employeeData.contact &&
        Object.entries(employeeData.contact).map(([key, value]) => (
          <InfoEntry key={key} label={key.replace(/_/g, " ")} value={value} />
        ))}

      {/* Visa Status */}
      <SectionTitle title="Visa Status" />
      {employeeData.visa_status &&
        Object.entries(employeeData.visa_status).map(([key, value]) => (
          <InfoEntry key={key} label={key.replace(/_/g, " ")} value={value} />
        ))}
    </InfoBox>
  );
};

const Element11: React.FC<ElementProps> = ({ employeeData }) => {
  if (!employeeData || !employeeData.reference) {
    return <div>No reference data available</div>;
  }

  return (
    <InfoBox>
      {/* Reference */}
      <SectionTitle title="Reference" />
      {Object.entries(employeeData.reference).map(([key, value]) => (
        <InfoEntry key={key} label={key.replace(/_/g, " ")} value={value} />
      ))}
    </InfoBox>
  );
};

const Element02: React.FC<ElementProps> = ({ employeeData }) => {
  if (
    !employeeData ||
    (!employeeData.emergency_contact1 && !employeeData.emergency_contact2)
  ) {
    return <div>No emergency contact data available</div>;
  }

  return (
    <InfoBox>
      {/* Emergency Contact 1 */}
      {employeeData.emergency_contact1 && (
        <>
          <SectionTitle title="Emergency Contact 1" />
          {Object.entries(employeeData.emergency_contact1).map(
            ([key, value]) => (
              <InfoEntry
                key={key}
                label={key.replace(/_/g, " ")}
                value={value}
              />
            )
          )}
        </>
      )}

      {/* Emergency Contact 2 */}
      {employeeData.emergency_contact2 && (
        <>
          <SectionTitle title="Emergency Contact 2" />
          {Object.entries(employeeData.emergency_contact2).map(
            ([key, value]) => (
              <InfoEntry
                key={key}
                label={key.replace(/_/g, " ")}
                value={value}
              />
            )
          )}
        </>
      )}
    </InfoBox>
  );
};

// avatar
interface AvatarBoxProps {
  topHeight: number;
  avatar?: string;
}

const AvatarBox: React.FC<AvatarBoxProps> = ({ topHeight, avatar }) => (
  <Box
    sx={{
      width: "100%",
      height: `${topHeight}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Avatar
      src={avatar || undefined}
      sx={{
        width: "100%",
        height: topHeight,
        borderRadius: "0px",
      }}
    />
  </Box>
);

// documents
interface DocumentsElementProps {
  documents: DocumentInterface[];
}

const DocumentsElement: React.FC<DocumentsElementProps> = ({ documents }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        paddingLeft: "10px",
        width: "90%",
        display: "grid",
        gridTemplateColumns: "1fr",
        textAlign: "left",
        gap: 1,
        paddingTop: isMobile ? "40px" : 0,
      }}
    >
      {!isMobile && <SectionTitle title="Documents" />}
      {documents.map((doc, index) => (
        <Document
          key={index}
          documentName={doc.documentName}
          lastModifiedDate={doc.lastModifiedDate}
          documentSize={doc.documentSize}
          canDownload={doc.canDownload}
          canPreview={doc.canPreview}
          documentUrl={doc.documentUrl}
        />
      ))}
    </Box>
  );
};

export {
  Element10,
  Element01,
  Element11,
  Element02,
  AvatarBox,
  DocumentsElement,
};
