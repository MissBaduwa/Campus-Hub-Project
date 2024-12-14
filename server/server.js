import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js'; 
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/user.js';  


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/auth', authRoutes);  // Handles /auth/register and /auth/login
app.use('/events', eventRoutes);  // Handles event-related routes
app.use('/users', userRoutes);  // Handles user profile and preferences routes


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));