import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import PreviewIcon from "@mui/icons-material/Preview";

interface DocumentProps {
  documentName: string;
  lastModifiedDate: string;
  documentSize: string;
  canDownload: boolean;
  canPreview: boolean;
  documentUrl: string;
}

const Document: React.FC<DocumentProps> = ({
  documentName,
  lastModifiedDate,
  documentSize,
  canDownload,
  canPreview,
  documentUrl,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <DescriptionIcon sx={{ color: theme.palette.primary.dark }} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle1">{documentName}</Typography>
          <Typography variant="caption">{`${lastModifiedDate} • ${documentSize}`}</Typography>
        </Box>
      </Box>
      <Box>
        {canDownload && (
          <IconButton href={documentUrl} download>
            <DownloadIcon sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
        )}
        {canPreview && (
          <IconButton>
            <PreviewIcon sx={{ color: theme.palette.primary.dark }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Document;
