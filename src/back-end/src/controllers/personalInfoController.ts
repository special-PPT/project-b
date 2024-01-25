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
      console.log(userId);
      console.log(req.body);
      // const personalInfo = await PersonalInformation.findById(userId);

      const updatedInfo = await PersonalInformation.findOneAndUpdate(
        { userID: userId },
        updateData,
        { new: true }
      );
      console.log(updatedInfo);
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
    // const documentKey = file.key;

    try {
      // Update user's document with the S3 file URL
      const updatedInfo = await PersonalInformation.findOneAndUpdate(
        { userID: userId },
        {
          $push: {
            documents: {
              url: file.location,
              // type: file.mimetype,
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

  async updateProfileImage(req: Request, res: Response) {
    const file = req.file as Express.MulterS3.File;
    const userId = req.params.userId;
    // const documentType = req.body.documentType; // Assuming this is passed along with the file
    // const status = req.body.status;
    // const documentKey = file.key;
    // const fileName = req.body.name;
  
    try {
      // Assuming userID is stored as a string that matches the ObjectId format
      const updatedInfo = await PersonalInformation.findOneAndUpdate(
        { userID: userId },
        { $set: { profilePicture: file.location } }, // Correctly set the profilePicture field
        { new: true } // Return the updated document
      );
  
      if (updatedInfo) {
        res.status(200).json({ updatedInfo });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error); // Logging the error can help with debugging
      res.status(500).json({ message: "Error updating profile picture", error });
    }
  },

  async getProfileImage() {

  },

  async getDocuments(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      // Retrieve the document URL from the database
      // (Assuming 'documents' is an array in your schema and each document has a 'key' and 'url' property)
      const userInfo = await PersonalInformation.findOne({ userID: userId });
      const documents = userInfo?.documents;

      if (document) {
        res.status(200).json({ documents });
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
