import express from 'express';
import hrController from '../controllers/hrController'; 

const router = express.Router();

// Generate and send a registration token
router.post('/generateToken', hrController.generateToken);

// View all employee profiles
router.get('/viewProfiles', hrController.viewEmployeeProfiles);

// Update an employee profile
router.put('/updateProfile', hrController.updateEmployeeProfile);

// Other HR-related routes...

export default router;
