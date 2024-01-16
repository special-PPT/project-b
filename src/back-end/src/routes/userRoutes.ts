import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// Update user status route
router.put('/updateStatus', userController.updateUserStatus);

export default router;

