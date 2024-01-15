import express, { Request, Response } from 'express';
import HRManagement from '../models/HRManagement'; 
import User from '../models/User';

const hrController = {
  // Generate and send a registration token
  async generateToken(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      // Generate a token logic here (can use a package like uuid or crypto)
      const token = 'generated-token'; // Replace this with actual token generation logic

      // Save the token information in HRManagement
      // Assuming HRManagement schema can store registration tokens
      const hrRecord = new HRManagement({
        // set the registration token details here
      });

      await hrRecord.save();

      // Send an email with the token (use an email service)
      // This is just a placeholder for sending an email
      console.log(`Sending email to ${email} with token: ${token}`);

      res.status(200).json({ message: 'Registration token generated and sent' });
    } catch (error) {
      res.status(500).json({ message: 'Error generating token', error });
    }
  },

  // View all employee profiles
  async viewEmployeeProfiles(req: Request, res: Response) {
    try {
      const profiles = await User.find({});
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving employee profiles', error });
    }
  },

  // Update an employee profile (or other HR specific operations)
  async updateEmployeeProfile(req: Request, res: Response) {
    try {
      const { userId, updateData } = req.body;

      const updatedProfile = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedProfile) {
        return res.status(404).send('Employee profile not found');
      }

      res.status(200).json({ message: 'Employee profile updated successfully', updatedProfile });
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee profile', error });
    }
  },

  // Other HR specific methods...
};

export default hrController;
