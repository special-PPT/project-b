import express from "express";
import hrController from "../controllers/hrController";

const router = express.Router();

// Generate and send a registration token
router.post("/generateToken", hrController.generateToken);

// Define the route for sending email notifications
router.post("/send-notifications", hrController.sendEmailNotifications);

// get all employees' information for display
// used by HR
router.get("/getAllEmployeeProfiles", hrController.getAllEmployeeProfiles);

// get all information from HRManagement (used by History component)
router.get("/get-hrmanagement-data", hrController.getAllHRManagementData);

// get all onboarding applications
router.get("/onboarding-applications", hrController.getAllOnboardingApps);

// Update an employee profile
router.put("/updateProfile", hrController.updateEmployeeProfile);

// Route for updating visa document status
router.put("/updateVisaDocStatus", hrController.updateVisaDocStatus);

// Default route for documentation
router.get("/", (req, res) => {
  res.send({
    routes: {
      generateToken: {
        method: "POST",
        path: "/generateToken",
        description: "Generate and send a registration token",
      },
      viewProfiles: {
        method: "GET",
        path: "/viewProfiles",
        description: "View all employee profiles",
      },
      updateProfile: {
        method: "PUT",
        path: "/updateProfile",
        description: "Update an employee profile",
      },
    },
  });
});

export default router;
