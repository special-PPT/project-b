import { Request, Response } from "express";
import VisaStatus from "../models/VisaStatus";

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

  // Upload visa document
  async uploadVisaDocument(req: Request, res: Response) {
    try {
      const { userId, documentType, documentUrl } = req.body;

      const visaStatus = await VisaStatus.findOne({ userID: userId });
      if (!visaStatus) {
        return res.status(404).send("Visa status not found");
      }

      visaStatus.documents.push({
        type: documentType,
        url: documentUrl,
        status: "Pending",
      });
      await visaStatus.save();

      res.status(200).json({ message: "Document uploaded successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading document", error });
    }
  },

  // View visa documents
  async viewVisaDocuments(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      const visaStatus = await VisaStatus.findOne({ userID: userId });
      if (!visaStatus) {
        return res.status(404).send("Visa status not found");
      }

      res.status(200).json(visaStatus.documents);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving documents", error });
    }
  },

  // Other visa management methods...
};

export default visaController;
