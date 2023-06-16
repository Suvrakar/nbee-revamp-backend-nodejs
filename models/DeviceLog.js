const { Schema, model } = require("mongoose");


const DeviceLog = model('DeviceLog', Schema({
    name: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    device1: { type: String, required: false, unique: false },
    device2: { type: String, required: false, unique: false },
    device3: { type: String, required: false, unique: false },
    device: [{ device1: String, device2: String, device3: String }]
}));

exports.DeviceLog = DeviceLog;


