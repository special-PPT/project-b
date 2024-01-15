import { Request, Response } from 'express';
import PersonalInformation from '../models/PersonalInformation';

const personalInfoController = {
  // Update personal information
  async updatePersonalInfo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const updateData = req.body;

      const updatedInfo = await PersonalInformation.findOneAndUpdate({ userID: userId }, updateData, { new: true });
      if (!updatedInfo) {
        return res.status(404).send('Personal information not found');
      }

      res.status(200).json({ message: 'Personal information updated successfully', updatedInfo });
    } catch (error) {
      res.status(500).json({ message: 'Error updating personal information', error });
    }
  },

  // Get personal information
  async getPersonalInfo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const personalInfo = await PersonalInformation.findOne({ userID: userId });
      if (!personalInfo) {
        return res.status(404).send('Personal information not found');
      }

      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving personal information', error });
    }
  },

  // Upload document
  async uploadDocument(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const document = req.body; // This is a simplified version. In a real application, you would handle file uploads differently, probably using middleware like `multer`.

      const personalInfo = await PersonalInformation.findOne({ userID: userId });
      if (!personalInfo) {
        return res.status(404).send('Personal information not found');
      }

      personalInfo.documents.push(document);
      await personalInfo.save();

      res.status(200).json({ message: 'Document uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading document', error });
    }
  },

  // Other personal information related methods...
};

export default personalInfoController;
