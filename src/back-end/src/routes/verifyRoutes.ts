import express from 'express';
import RegistrationTokenController from '../controllers/RegistrationTokenController';

const router = express.Router();

// Route for verifying a user
router.get('/:token', RegistrationTokenController.verify);

export default router;