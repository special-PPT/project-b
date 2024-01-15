import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes'; // Adjust the import path
import personalInfoRoutes from './routes/personalInfoRoutes'; // Adjust the import path
import applicationRoutes from './routes/applicationRoutes'; // Adjust the import path
import visaRoutes from './routes/visaRoutes'; // Adjust the import path
import hrRoutes from './routes/hrRoutes'; // Adjust the import path

const app = express();

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string')
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
