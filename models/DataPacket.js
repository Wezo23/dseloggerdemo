const mongoose = require('mongoose');

const DataPacketSchema = new mongoose.Schema({
  msg: String,
  imei: String,
  data: mongoose.Schema.Types.Mixed,
  sig: Number,
  time: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { strict: false }); // Allow any JSON structure

module.exports = mongoose.model('DataPacket', DataPacketSchema);