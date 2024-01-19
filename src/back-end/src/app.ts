import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import personalInfoRoutes from './routes/personalInfoRoutes'; 
import applicationRoutes from './routes/applicationRoutes'; 
import visaRoutes from './routes/visaRoutes';
import hrRoutes from './routes/hrRoutes';
import cors from 'cors'; 
require('dotenv').config();
const app = express();


// Test Email
// const { sendEmail } = require('./config/mailConfig');
// sendEmail('zhengmao@pdx.edu', '1234567890');
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to parse JSON
const corsOptions = {
  credentials: true, // 允许跨域请求携带凭据
};

app.use(cors(corsOptions));
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
