import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import personalInfoRoutes from './routes/personalInfoRoutes';
import applicationRoutes from './routes/applicationRoutes';
import visaRoutes from './routes/visaRoutes';
import hrRoutes from './routes/hrRoutes';
import verifyRoutes from './routes/verifyRoutes';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import { verify } from 'crypto';

require('dotenv').config();
const CookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(cookieParser());

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// CORS配置
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // 允许跨域请求携带凭据
};

app.use(cors(corsOptions));
app.use(CookieParser());
app.use(express.json());

// Built-in middleware for URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Route Middlewares
app.use('/user', userRoutes);
app.use('/personalInfo', personalInfoRoutes);
app.use('/application', applicationRoutes);
app.use('/visa', visaRoutes);
app.use('/hr', hrRoutes);
// /verify/${token.token}
app.use('/verify', verifyRoutes);



// 处理不存在的路由
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
