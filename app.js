require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/v1/api/dse-logger', dataRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});