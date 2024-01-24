import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { visaFileModalStyle } from "../../../styles/hr/visaTableMobile";
import Document from "../common/Document";
import DecisionButtons from "../common/FileDecision";
import { useTypedSelector } from "../../../redux/hooks/useTypedSelector";
import { transformVisaDocuments } from "../data/visa/visaDataTransformUtils";

interface FilesModalProps {
  currTab: string;
  employee_id: string;
  open: boolean;
  onClose: () => void;
}

const FilesModal: React.FC<FilesModalProps> = ({
  currTab,
  employee_id,
  open,
  onClose,
}) => {
  const employees = useTypedSelector((state) => state.hr.employees);
  const employee =
    employee_id && employees[employee_id] ? employees[employee_id] : undefined;
  const files = employee ? transformVisaDocuments(employee) : [];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={visaFileModalStyle}>
        <Typography variant="h6" component="h2" sx={{ float: "left" }}>
          Documents
        </Typography>
        <IconButton onClick={onClose} sx={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
        <List
          sx={{ clear: "both", maxWidth: 560, bgcolor: "background.paper" }}
        >
          {files.map((file, index) => (
            <ListItem
              key={index}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Document
                documentName={file.name}
                lastModifiedDate={file.modifiedDate}
                documentSize={file.status}
                canDownload={file.canDownload}
                canPreview={file.canPreview}
                documentUrl={file.documentUrl}
              />
              {currTab === "inProgress" && file.status === "Pending" && (
                <DecisionButtons employeeId={employee_id} type={file.name} />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default FilesModal;
