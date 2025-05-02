const DataPacket = require('../models/DataPacket');
const { validateData } = require('../utils/validator');

exports.pushData = async (req, res) => {
  try {
    // Validate request body
    if (!validateData(req.body)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data format'
      });
    }

    // Save to database
    const packet = new DataPacket(req.body);
    await packet.save();

    res.status(201).json({
      status: 'success',
      message: 'Data stored successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};