const { Schema, model } = require("mongoose");


const Users = model('Users', Schema({
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: false },
    unvname: { type: String, required: true, unique: false },
    paymentStatus: { type: String, required: false },
    password: { type: String, required: true },
    quiz1_1: { type: Number, required: false },
    quiz1_2: { type: Number, required: false },
}));

exports.Users = Users;

