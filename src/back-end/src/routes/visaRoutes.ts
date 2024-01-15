import express from 'express';
import visaController from '../controllers/visaController'; // Adjust the import path based on your project structure

const router = express.Router();

// Update visa status
router.put('/status/update/:userId', visaController.updateVisaStatus);

// Upload visa document
router.post('/document/upload/:userId', visaController.uploadVisaDocument);

// View visa documents
router.get('/documents/:userId', visaController.viewVisaDocuments);

// Other visa-related routes...

export default router;
