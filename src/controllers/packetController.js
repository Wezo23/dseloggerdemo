import Packet from '../models/packet.js';

// Save packet data
export const savePacket = async (req, res) => {
  try {
    const loggerData = new Packet(req.body); // Create a new logger document
    await loggerData.save(); // Save data to MongoDB

    res.status(201).json({
      success: true,
      message: 'Logger data saved successfully',
      data: loggerData
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error saving logger data',
      error: error.message
    });
  }
};