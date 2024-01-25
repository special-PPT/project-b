import React, { useState } from "react";
import { Button, Box, Container } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from 'axios';
import { useCookies } from "react-cookie";

interface FileUploadButtonProps {
    documentType: string; // Assuming you're passing this as a prop
    status: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ documentType, status }) => {
    const [cookies] = useCookies(['userId']);
    const userId = cookies.userId;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>("");

    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const uploadFile = async (file: File, userId: string) => {
        let formData = new FormData();

        if (documentType === 'image') {
            formData.append("image", file);
        } else {
            formData.append('document', file);
            formData.append('type', documentType);
            formData.append('status', status);
            formData.append('name', file.name);
        }


        try {
            let response;
            if (documentType === 'image') {
                response = await axios.put(`http://localhost:8000/personalInfo/updateImage/${userId}`, formData, {
                    withCredentials: true,
                    onUploadProgress: (progressEvent: any) => {
                        const percentCompleted = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                        setUploadProgress(percentCompleted);
                    },
                });
            } else {
                response = await axios.post(`http://localhost:8000/visa/uploadDocument/${userId}`, formData, {
                    withCredentials: true,
                    onUploadProgress: (progressEvent: any) => {
                        const percentCompleted = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
                        setUploadProgress(percentCompleted);
                    },
                });
            }


            console.log(response.data);
            setUploadProgress(0);
            // Additional success handling
        } catch (error) {
            console.error('Error during file upload:', error);
            setUploadProgress(0);
            // Additional error handling
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFilename(file.name);
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            uploadFile(selectedFile, userId);
        }
    };

    return (
        <Box sx={{
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: "center",
            // justifyContent: "space-between",
            gap: '10px',
            mt: '20px',
            ml: '20px',
            // mb: "20px"

        }}>
            <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ m: 1, width: 200 }}
            >
                Upload File
                {documentType === 'image' ? (
                    <input type="file" name="image" accept="image/*" hidden onChange={handleFileChange} />

                ) : (
                    <input type="file" name="document" accept=".pdf" hidden onChange={handleFileChange} />

                )}
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
                    m: 1
                }}
                onClick={handleUpload}
            >
                Submit
            </Button>
            {filename && <Box sx={{ m: 2 }}>Selected file: {filename}</Box>}
            {uploadProgress > 0 && (
                <Box>
                    <p>Uploading: {uploadProgress}%</p>
                </Box>
            )}
        </Box>
    );
}

export default FileUploadButton;
