const mongoose = require('mongoose');

// Define the Modbus schema
const ModbusSchema = new mongoose.Schema({
    sid: Number,
    stat: Number,
    rcnt: Number,
    AC_VOLTAGE_L1: Number,
    AC_VOLTAGE_L2: Number,
    AC_VOLTAGE_L3: Number,
    AC_CURRENT_L1: Number,
    AC_CURRENT_L2: Number,
    AC_CURRENT_L3: Number,
    AC_POWER: Number,
    AC_FREQUENCY: Number,
    COS_PHI: Number,
    REACTIVE_POWER: Number,
    DC_VOLTAGE: Number,
    DC_CURRENT: Number,
    DC_POWER: Number,
    INVERTER_TEMP: Number,
    KWH_COUNTER: Number,
    MWH_COUNTER: Number,
    GWH_COUNTER: Number,
    GHI: Number, // Added field
    POA: Number, // Added field
    "Module Temp": Number, // Added field
    "Ambient Temp": Number, // Added field
    Direction: Number, // Added field
    Humidity: Number, // Added field
    "Wind Speed": Number, // Added field
});

// Define the main schema for Datalogger
const DataloggerSchema = new mongoose.Schema({
    imei: { type: String, required: true },
    uid: { type: Number, required: true },
    dtm: { type: String, required: true },
    seq: { type: Number, required: true },
    sig: { type: Number, required: true },
    msg: { type: String, required: true },
    modbus: [ModbusSchema],
    insertiontime: { type: Date, default: Date.now },
    updationtime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Datalogger', DataloggerSchema);