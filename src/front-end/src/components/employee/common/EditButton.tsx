import React from 'react';
import { Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


interface EditButtonProps {
    onClick: () => void;
}


const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                position: "absolute",
                top: 10,
                right: 10,
                border: "none",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white", // Circle color
                    color: "black", // Icon color
                }}
            >
                <EditIcon />
            </Box>
        </Button>
    );
};

export default EditButton;