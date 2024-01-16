import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import personalInfoRoutes from './routes/personalInfoRoutes'; 
import applicationRoutes from './routes/applicationRoutes'; 
import visaRoutes from './routes/visaRoutes';
import hrRoutes from './routes/hrRoutes';

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to parse JSON
app.use(express.json());

// Route Middlewares
app.use('/user', userRoutes);
app.use('/personalInfo', personalInfoRoutes);
app.use('/application', applicationRoutes);
app.use('/visa', visaRoutes);
app.use('/hr', hrRoutes);

// Handling Not Found Routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
