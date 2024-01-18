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

interface FileData {
  name: string;
  modifiedDate: string;
  size: string;
  canDownload: boolean;
  canPreview: boolean;
  documentUrl: string;
}

interface FilesModalProps {
  currTab: string;
  employee_id: number;
  open: boolean;
  onClose: () => void;
}

const FilesModal: React.FC<FilesModalProps> = ({
  currTab,
  employee_id,
  open,
  onClose,
}) => {
  const [files, setFiles] = useState<FileData[]>([]);

  const generateRandomFiles = (): FileData[] => {
    const randomFiles: FileData[] = [];
    for (let i = 0; i < 5; i++) {
      randomFiles.push({
        name: `File_${i + 1}`,
        modifiedDate: `2023-07-${Math.floor(Math.random() * 30) + 1}`,
        size: `${Math.floor(Math.random() * 100) + 1}kb`,
        canDownload: Math.random() < 0.9,
        canPreview: Math.random() < 0.9,
        documentUrl: "https://example.com/file.pdf", // TODO:
      });
    }
    return randomFiles;
  };

  useEffect(() => {
    if (open) {
      setFiles(generateRandomFiles());
    }
  }, [open]);

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
                documentSize={file.size}
                canDownload={file.canDownload}
                canPreview={file.canPreview}
                documentUrl={file.documentUrl}
              />
              {currTab === "inProgress" && <DecisionButtons />}
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default FilesModal;
