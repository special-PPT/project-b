import express from 'express';
import personalInfoController from '../controllers/personalInfoController'; // Adjust the import path based on your project structure
import { upload } from '../config/s3MulterConfig'; // Your S3 multer configuration
import { authenticateToken } from '../config/authToken';

const router = express.Router();

// Update personal information route
router.put('/update/:userId', personalInfoController.updatePersonalInfo);

// Get personal information route
router.get('/get/:userId', authenticateToken, personalInfoController.getPersonalInfo);

// Upload document route
router.post('/uploadDocument/:userId', authenticateToken, upload.single('document'), personalInfoController.uploadDocument);

// Update profile image
router.put('/updateImage/:userId', authenticateToken, upload.single('image'),personalInfoController.updateProfileImage);


// Route for getting a document
router.get('/document/:userId/:documentKey', authenticateToken, personalInfoController.getDocuments);

export default router;
