import { Request, Response } from 'express';
import PersonalInformation from '../models/PersonalInformation';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

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

  async uploadDocument(req: Request, res: Response) {
    const file = req.file as Express.MulterS3.File;
    const userId = req.params.userId;

    try {
        // Update user's document with the S3 file URL
        const updatedInfo = await PersonalInformation.findOneAndUpdate(
            { userID: userId },
            { $push: { documents: { url: file.location, type: file.mimetype } } },
            { new: true }
        );

        res.status(200).json({ message: 'Document uploaded successfully', updatedInfo });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error });
    }
},

async getDocument(req: Request, res: Response) {
    const { userId, documentKey } = req.params;

    // Generate a signed URL for the document
    const command = new GetObjectCommand({
        Bucket: 'chuwaprojectb',
        Key: documentKey
    });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
        res.status(200).json({ documentUrl: url });
    } catch (error) {
        res.status(500).json({ message: 'Error generating document URL', error });
    }
},

  // Other personal information related methods...
};

export default personalInfoController;
