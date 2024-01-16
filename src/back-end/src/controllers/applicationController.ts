import { Request, Response } from 'express';
import OnboardingApplication from '../models/OnboardingApplication';

const applicationController = {
  // Submit an onboarding application
  async submitApplication(req: Request, res: Response) {
    try {
      const { userID, applicationData } = req.body;

      const newApplication = new OnboardingApplication({
        userID,
        applicationData,
        status: 'Pending',
        submittedDate: new Date()
      });

      await newApplication.save();

      res.status(201).json({ message: 'Application submitted successfully', applicationId: newApplication._id });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting application', error });
    }
  },

  // Review an onboarding application
  async reviewApplication(req: Request, res: Response) {
    try {
      const { applicationId, status, feedback } = req.body;

      const application = await OnboardingApplication.findById(applicationId);
      if (!application) {
        return res.status(404).send('Application not found');
      }

      application.status = status;
      application.feedback = feedback;
      application.reviewedDate = new Date();

      await application.save();

      res.status(200).json({ message: 'Application reviewed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error reviewing application', error });
    }
  },

  // Get application details
  async getApplicationDetails(req: Request, res: Response) {
    try {
      const { applicationId } = req.params;

      const application = await OnboardingApplication.findById(applicationId).populate('applicationData');
      if (!application) {
        return res.status(404).send('Application not found');
      }

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving application details', error });
    }
  },

  // Other application related methods...
};

export default applicationController;
