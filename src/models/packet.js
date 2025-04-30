import mongoose from 'mongoose';

// Schema for modbus data
const ModbusSchema = new mongoose.Schema({
  sid: { type: Number },
  stat: { type: Number },
  rcnt: { type: Number },
  reg1: { type: Number },
  reg2: { type: Number },
  reg3: { type: Number },
  reg4: { type: Number },
  reg5: { type: Number },
}, { _id: false }); // Prevents creating an extra `_id` field for each array element

// Schema for IO data
const IoSchema = new mongoose.Schema({
  di1: { type: Number },
  di2: { type: Number },
  a1: { type: Number },
  a2: { type: Number },
  s1: { type: Number },
  p1: { type: Number },
  dev: {
    sysv: { type: Number },
  },
}, { _id: false });

// Main packet schema
const PacketSchema = new mongoose.Schema({
  msg: { type: String, required: true }, // Packet type: login, sys, log, io
  imei: { type: String, required: true },
  uid: { type: Number },
  dtm: { type: String },
  seq: { type: Number },
  sig: { type: Number },
  alert: { type: String },
  info: { type: String },
  modbus: [ModbusSchema],
  io: IoSchema,
  insertiontime: { type: Date, default: Date.now },
  updationtime: { type: Date, default: Date.now },
});

const Packet = mongoose.model('Packet', PacketSchema);

export default Packet;