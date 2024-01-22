import express, { Request, Response } from "express";
import HRManagement from "../models/HRManagement";
import User from "../models/User";
import PersonalInformation from "../models/PersonalInformation";
import VisaStatus from "../models/VisaStatus";
import RegistrationToken from "../models/RegistrationToken";
const { registTokenGen } = require("../config/registTokenGen");
const { sendEmail } = require("../config/mailConfig");

const hrController = {
  // Generate and send a registration token
  async generateToken(req: Request, res: Response) {
    try {
      const { name, email, userId } = req.body;

      // Generate a token logic here (can use a package like uuid or crypto)
      const token = registTokenGen(email + name); // Replace this with actual token generation logic
      sendEmail(email, token);

      // Create a RegistrationToken and save it
      const now = new Date();
      const expiry = new Date(now.getTime() + 3600 * 1000);

      const registrationToken = new RegistrationToken({
        name: name,
        token: token,
        email: email,
        expiry: expiry,
        status: "sent",
        userId: userId,
      });

      // Save the token information in HRManagement
      // Assuming HRManagement schema can store registration tokens
      const hrRecord = new HRManagement({
        // set the registration token details here
      });

      await hrRecord.save();

      // Send an email with the token (use an email service)
      // This is just a placeholder for sending an email
      console.log(`Sending email to ${email} with token: ${token}`);

      res
        .status(200)
        .json({ message: "Registration token generated and sent" });
    } catch (error) {
      res.status(500).json({ message: "Error generating token", error });
    }
  },

  // View all employee profiles
  async viewEmployeeProfiles(req: Request, res: Response) {
    try {
      const profiles = await User.find({});
      res.status(200).json(profiles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving employee profiles", error });
    }
  },

  // get all employees' information for display
  // used by HR: id, name, ssn, work auth, phone, email
  async getAllEmployeeProfiles(req: Request, res: Response) {
    try {
      const employees = await User.find({ role: "Employee" })
        .populate("personalInformation")
        .populate("visaStatus");
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving all employee personal info",
        error,
      });
    }
  },

  async getEmployeePersonalInfoById(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      const personalInfo = await PersonalInformation.findOne({
        userID: employeeId,
      }).populate("documents");

      if (!personalInfo) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(personalInfo);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving employee personal info",
        error,
      });
    }
  },

  async getEmployeeVisaStatusById(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      const visaStatus = await VisaStatus.findOne({ userID: employeeId });

      if (!visaStatus) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json(visaStatus);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving employee visa status",
        error,
      });
    }
  },

  // update the status of a file (when hr accept/reject)
  async updateVisaDocStatus(req: Request, res: Response) {
    try {
      const { employee_id, type, isAccept, feedback } = req.body;

      // Find the employee's visa status
      const visaStatus = await VisaStatus.findOne({ userID: employee_id });

      if (!visaStatus) {
        return res.status(404).send('Employee not found');
      }

      // Find the document by type
      const document = visaStatus.documents.find(doc => doc.type === type);

      if (!document) {
        return res.status(404).send('Document not found');
      }

      // Update the document's status and feedback
      document.status = isAccept ? 'Accepted' : 'Rejected';
      document.feedback = feedback;

      // Save the updated visa status
      await visaStatus.save();

      return res.status(200).send('Document status updated successfully');
    } catch (error) {
      console.error('Error updating document status:', error);
      return res.status(500).send('Internal Server Error');
    }
  },

  // Update an employee profile (or other HR specific operations)
  async updateEmployeeProfile(req: Request, res: Response) {
    try {
      const { userId, updateData } = req.body;

      const updatedProfile = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      if (!updatedProfile) {
        return res.status(404).send("Employee profile not found");
      }

      res.status(200).json({
        message: "Employee profile updated successfully",
        updatedProfile,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating employee profile", error });
    }
  },

  // Other HR specific methods...
};

export default hrController;
