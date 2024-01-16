import express from 'express';
import visaController from '../controllers/visaController'; // Adjust the import path based on your project structure
import { upload } from '../config/s3MulterConfig'; // Your S3 multer configuration

const router = express.Router();

// Update visa status
router.put('/status/update/:userId', visaController.updateVisaStatus);

// Route for uploading a document
router.post('/uploadDocument/:userId', upload.single('document'), visaController.uploadDocument);

// Route for getting a document
router.get('/document/:userId/:documentKey', visaController.getDocument);

// Other visa-related routes...

export default router;
