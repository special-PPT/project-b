import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const userController = {
  // User registration
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Check if the user already exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send('User not found');
      }

      // Hash the password
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      // check password
      if (user.password !== password) {
        return res.status(400).send('Password is not correct');
      }
      
      // check email
      if (user.email !== email) {
        return res.status(400).send('Email is not correct');
      }

      res.status(200).json({ message: 'User can go to registration page' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering new user', error });
    }
  },

  // User login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send('User not found');
      }

      // Check password
      // const validPassword = await bcrypt.compare(password, user.password);
      if (user.password !== password) {
        return res.status(400).send('Invalid password');
      }

      // Create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'your-default-secret', { expiresIn: '1h' });
      
      res.header('auth-token', token).json({
        message: 'Logged in successfully',
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in user', error });
    }
  },

  // Update user status
  async updateUserStatus(req: Request, res: Response) {
    try {
      const { userId, isActive } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }

      user.isActive = isActive;
      await user.save();

      res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user status', error });
    }
  }
};

export default userController;
