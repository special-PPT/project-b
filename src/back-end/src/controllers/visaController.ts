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

  async getVisaStatus(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const visaStatus = await VisaStatus.findOne({ userID: userId });

      if (!visaStatus) {
        return res.status(404).send('Visa Status not found');
      }
      res.status(200).json(visaStatus);
    } catch (error) {
      res.status(500).json({ message: "Error updating visa status", error });
    }
  },

  

  async uploadDocument(req: Request, res: Response) {
    const file = req.file as Express.MulterS3.File;
    const userId = req.params.userId;
    const documentType = req.body.documentType; // Assuming this is passed along with the file
    const status = req.body.status;
    const documentKey = file.key;
    const fileName = req.body.name;
  
    try {
      // Check if the document of this type already exists for the user
      const existingDocument = await VisaStatus.findOne({
        userID: userId,
        "documents.docType": documentType
      });
  
      let updatedInfo;
  
      if (existingDocument) {
        // Update the existing document
        updatedInfo = await VisaStatus.findOneAndUpdate(
          { userID: userId, "documents.docType": documentType },
          {
            $set: {
              'documents.$.url': file.location,
              'documents.$.name': fileName,
              'documents.$.status': 'Pending',
              'documents.$.feedback': ''
            },
          },
          { new: true }
        );
      } else {
        // Add a new document
        updatedInfo = await VisaStatus.findOneAndUpdate(
          { userID: userId },
          {
            $push: {
              documents: {
                docType: documentType,
                url: file.location,
                name: fileName,
                documentKey: documentKey,
                status: status,
              },
            },
          },
          { new: true }
        );
      }
  
      res.status(200).json({ message: "Document uploaded successfully", updatedInfo });
    } catch (error) {
      res.status(500).json({ message: "Error updating document", error });
    }
  },
  

  async getDocument(req: Request, res: Response) {
    const { userId, name } = req.params;

    try {
      // Retrieve the document URL from the database
      // (Assuming 'documents' is an array in your schema and each document has a 'key' and 'url' property)
      const userInfo = await VisaStatus.findOne({ userID: userId });
      const document = userInfo?.documents.find(
        (doc) => doc.name === name
      );

      if (document) {
        res.status(200).json({ documentUrl: document.url });
      } else {
        res.status(404).json({ message: "Document not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving document", error });
    }
  },

  // Other visa management methods...
};

export default visaController;
