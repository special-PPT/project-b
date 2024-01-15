import express from 'express';
import personalInfoController from '../controllers/personalInfoController'; // Adjust the import path based on your project structure

const router = express.Router();

// Update personal information route
router.put('/update/:userId', personalInfoController.updatePersonalInfo);

// Get personal information route
router.get('/get/:userId', personalInfoController.getPersonalInfo);

// Upload document route
router.post('/uploadDocument/:userId', personalInfoController.uploadDocument);

export default router;
