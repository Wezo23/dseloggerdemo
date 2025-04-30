

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import packetRoutes from './routes/packetRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api', packetRoutes);

// Server Port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});