import express, { Request, Response } from "express";
import HRManagement from "../models/HRManagement";
import User from "../models/User";
import OnboardingApplication from "../models/OnboardingApplication";
import PersonalInformation from "../models/PersonalInformation";
import VisaStatus from "../models/VisaStatus";
import RegistrationToken from "../models/RegistrationToken";
import registTokenGen from "../config/registTokenGen";
const { sendEmail, sendEmailNotifs } = require("../config/mailConfig");

const hrController = {
  // Generate and send a registration token
  async generateToken(req: Request, res: Response) {
    try {
      const { name, email, userId } = req.body;

      // Generate a token logic here (can use a package like uuid or crypto)
      const token = registTokenGen(email + name);
      sendEmail(email, token);

      // Create a RegistrationToken and save it
      const now = new Date();
      const expiry = new Date(now.getTime() + 3600 * 1000);

      const registrationToken = new RegistrationToken({
        name: name,
        token: token,
        email: email,
        expiry: expiry,
        status: "Sent",
        userId: userId,
      });

      await registrationToken.save();

      // Find the HR user's ID from the Users collection
      const hrUser = await User.findOne({ role: "HR" });
      if (!hrUser) {
        throw new Error("HR user not found");
      }
      const hrUserId = hrUser._id;

      // Find HRManagement record corresponding to HR's userId and update it
      let hrRecord = await HRManagement.findOne({ userID: hrUserId });

      if (!hrRecord) {
        // If no HRManagement record exists for HR, create a new one
        hrRecord = new HRManagement({
          userID: hrUserId,
          registrationTokens: [],
          employeeProfiles: [],
        });
      }

      // Push the new token and employee profile to the HRManagement record
      hrRecord.registrationTokens.push(registrationToken._id);
      hrRecord.employeeProfiles.push(userId);

      await hrRecord.save();

      // Update user with the new registration token
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: { registrationToken: registrationToken._id },
      });
      if (!updatedUser) {
        throw new Error("User not found or update failed");
      }

      console.log(`Sending email to ${email} with token: ${token}`);
      res
        .status(200)
        .json({ message: "Registration token generated and sent" });
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ message: "Error generating token", error });
    }
  },

  // api for hr to send notification email to employee
  async sendEmailNotifications(req: Request, res: Response) {
    try {
      const { toUser, subject, text, html } = req.body;
      await sendEmailNotifs(toUser, subject, text, html);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  },

  // get all employees' information for display
  // used by HR: id, name, ssn, work auth, phone, email
  async getAllEmployeeProfiles(req: Request, res: Response) {
    try {
      const employees = await User.find({ role: "Employee" })
        .populate("personalInformation")
        .populate("visaStatus")
        .populate("registrationToken")
        .populate("onboardingApplication");
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving all employee personal info",
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
        return res.status(404).send("Employee not found");
      }

      // Find the document by type
      const document = visaStatus.documents.find((doc) => doc.type === type);

      if (!document) {
        return res.status(404).send("Document not found");
      }

      // Update the document's status and feedback
      document.status = isAccept ? "Accepted" : "Rejected";
      document.feedback = feedback;

      // Save the updated visa status
      await visaStatus.save();

      return res.status(200).send("Document status updated successfully");
    } catch (error) {
      console.error("Error updating document status:", error);
      return res.status(500).send("Internal Server Error");
    }
  },

  // get all information from HRManagement
  async getAllHRManagementData(req: Request, res: Response) {
    try {
      const hrUserId = req.query.hrUserId;

      // Find the HRManagement document for the HR user
      const hrData = await HRManagement.findOne({ userID: hrUserId })
        .populate("employeeProfiles")
        .populate("registrationTokens");

      res.status(200).json(hrData);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving HR management data",
        error,
      });
    }
  },

  // get all onboarding applications
  async getAllOnboardingApps(req: Request, res: Response) {
    try {
      const applications = await OnboardingApplication.find()
        .populate("userID")
        .populate("applicationData");

      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching onboarding applications:", error);
      res
        .status(500)
        .json({ message: "Error retrieving onboarding applications", error });
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
