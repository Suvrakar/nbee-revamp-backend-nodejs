const { Schema, model } = require("mongoose");


const CertiNbee101 = model('CertiNbee101', Schema({
    name: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
    quiz1: { type: String, required: false, unique: false },
    quiz2: { type: String, required: false, unique: false },
}));

exports.CertiNbee101 = CertiNbee101;


