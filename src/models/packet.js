import mongoose from 'mongoose';

// Sub-schema for 'modbus'
const ModbusSchema = new mongoose.Schema({
  sid: { type: Number, required: true }, // Sub ID
  stat: { type: Number, required: true }, // Status
  rcnt: { type: Number, required: true }, // Retry count
  Wind: { type: Number, required: true }, // Wind speed
  "Module Temp": { type: Number, required: true }, // Module Temperature
  "Ambient Temp1": { type: Number, required: true }, // Ambient Temperature (alternate)
  Humidity: { type: Number, required: true }, // Humidity
  PYRA: { type: Number, required: true } // Pyranometer data
});

const DataSchema = new mongoose.Schema({
  imei: { type: String, required: true }, // IMEI of the device
  uid: { type: Number, required: true }, // User ID
  dtm: { type: String, required: true }, // Datetime in string format
  seq: { type: Number, required: true }, // Sequence number
  sig: { type: Number, required: true }, // Signal quality
  msg: { type: String, required: true }, // Message type
  modbus: { type: [ModbusSchema], required: true } // Array of Modbus objects
});

const PacketSchema = new mongoose.Schema({
  data: { type: DataSchema, required: true } // Embedded 'data' schema
});

export default mongoose.model('Packet', PacketSchema);