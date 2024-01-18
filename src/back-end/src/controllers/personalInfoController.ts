import { Request, Response } from "express";
import PersonalInformation from "../models/PersonalInformation";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const personalInfoController = {
  // Update personal information
  async updatePersonalInfo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const updateData = req.body;

      const updatedInfo = await PersonalInformation.findOneAndUpdate(
        { userID: userId },
        updateData,
        { new: true }
      );
      if (!updatedInfo) {
        return res.status(404).send("Personal information not found");
      }

      res.status(200).json({
        message: "Personal information updated successfully",
        updatedInfo,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating personal information", error });
    }
  },

  // Get personal information
  async getPersonalInfo(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const personalInfo = await PersonalInformation.findOne({
        userID: userId,
      });
      if (!personalInfo) {
        return res.status(404).send("Personal information not found");
      }

      res.status(200).json(personalInfo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving personal information", error });
    }
  },

  async uploadDocument(req: Request, res: Response) {
    const file = req.file as Express.MulterS3.File;
    const userId = req.params.userId;
    const documentKey = file.key;

    try {
      // Update user's document with the S3 file URL
      const updatedInfo = await PersonalInformation.findOneAndUpdate(
        { userID: userId },
        {
          $push: {
            documents: {
              url: file.location,
              type: file.mimetype,
              documentKey: documentKey,
            },
          },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Document uploaded successfully", updatedInfo });
    } catch (error) {
      res.status(500).json({ message: "Error uploading document", error });
    }
  },

  async getDocument(req: Request, res: Response) {
    const { userId, documentKey } = req.params;

    try {
      // Retrieve the document URL from the database
      // (Assuming 'documents' is an array in your schema and each document has a 'key' and 'url' property)
      const userInfo = await PersonalInformation.findOne({ userID: userId });
      const document = userInfo?.documents.find(
        (doc) => doc.documentKey === documentKey
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

  // Other personal information related methods...
};

export default personalInfoController;
