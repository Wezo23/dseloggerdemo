require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Datalogger = require('./models/Datalogger');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL-encoded data
app.use(cors());

// Log raw request body for debugging
app.use((req, res, next) => {
    req.rawBody = '';
    req.on('data', (chunk) => {
        req.rawBody += chunk;
    });
    req.on('end', () => {
        console.log('Raw Body:', req.rawBody); // Log the raw body
        next();
    });
});

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// MongoDB Connection
const DB_URI = process.env.MONGODB_URI; // Use environment variable for DB URI
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// 1. Fetch all logs
app.get('/logs', async (req, res) => {
    try {
        const logs = await Datalogger.find();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Fetch log by ID
app.get('/logs/:id', async (req, res) => {
    try {
        const log = await Datalogger.findById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Create a new log
app.post('/logs', async (req, res) => {
    try {
        let data = req.body;

        // Fallback for raw body if req.body is undefined
        if (!data || Object.keys(data).length === 0) {
            try {
                data = JSON.parse(req.rawBody || '{}'); // Attempt to parse raw body
            } catch (err) {
                console.error('Error parsing raw body:', err.message);
                return res.status(400).json({ error: 'Invalid JSON format' });
            }
        }

        console.log('Received Data:', data); // Log the parsed data
        const newLog = new Datalogger(data); // Use the parsed data
        const savedLog = await newLog.save(); // Save the log to the database
        res.status(201).json(savedLog); // Respond with the saved log
    } catch (err) {
        console.error('Error Saving Data:', err.message); // Log the error
        res.status(400).json({ error: err.message }); // Handle any errors
    }
});

// 4. Update an existing log
app.put('/logs/:id', async (req, res) => {
    try {
        const updatedLog = await Datalogger.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json(updatedLog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. Delete a log
app.delete('/logs/:id', async (req, res) => {
    try {
        const deletedLog = await Datalogger.findByIdAndDelete(req.params.id);
        if (!deletedLog) return res.status(404).json({ message: 'Log not found' });
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8000; // Changed default port to 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));