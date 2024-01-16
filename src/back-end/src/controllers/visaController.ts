import { Request, Response } from "express";
import VisaStatus from "../models/VisaStatus";
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const visaController = {
  // Update visa status
  async updateVisaStatus(req: Request, res: Response) {
    try {
      const { userId, visaType, status, startDate, endDate } = req.body;

      const updatedVisaStatus = await VisaStatus.findOneAndUpdate(
        { userID: userId },
        { visaType, status, startDate, endDate },
        { new: true }
      );
      if (!updatedVisaStatus) {
        return res.status(404).send("Visa status not found");
      }

      res
        .status(200)
        .json({
          message: "Visa status updated successfully",
          updatedVisaStatus,
        });
    } catch (error) {
      res.status(500).json({ message: "Error updating visa status", error });
    }
  },

  async uploadDocument(req: Request, res: Response) {
    const file = req.file as Express.MulterS3.File;
    const userId = req.params.userId;

    try {
        // Update user's document with the S3 file URL
        const updatedInfo = await VisaStatus.findOneAndUpdate(
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

  // Other visa management methods...
};

export default visaController;
