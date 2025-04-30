import Packet from '../models/packet.js';

// Save packet data
export const savePacket = async (req, res) => {
  try {
    const { msg, data } = req.body;

    // Validate incoming data
    if (!msg || !data) {
      return res.status(400).json({ error: 'Missing required fields: msg or data' });
    }

    const packet = new Packet({
      msg,
      imei: data.imei,
      uid: data.uid,
      dtm: data.dtm,
      seq: data.seq,
      sig: data.sig,
      alert: data.alert,
      info: data.info,
      modbus: data.modbus,
      io: data.io,
    });

    const savedPacket = await packet.save();
    res.status(201).json(savedPacket);
  } catch (error) {
    console.error(`Error saving packet: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};