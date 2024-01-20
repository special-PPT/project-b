import express from 'express';
import personalInfoController from '../controllers/personalInfoController'; // Adjust the import path based on your project structure
import { upload } from '../config/s3MulterConfig'; // Your S3 multer configuration


const router = express.Router();

// Update personal information route
router.put('/update/:userId', personalInfoController.updatePersonalInfo);

// Get personal information route
router.get('/get/:userId', personalInfoController.getPersonalInfo);

// Upload document route
router.post('/uploadDocument/:userId', upload.single('file'), personalInfoController.uploadDocument);

// Route for getting a document
router.get('/document/:userId/:documentKey', personalInfoController.getDocument);

export default router;
