const { Schema, model } = require("mongoose");


const ProfileImage = model('Image', Schema({
    name: { type: String, required: false, unique: false },
    data: { type: Buffer, required: false, unique: false },
    contentType: { type: String, required: false, unique: false },
    email: { type: String, required: false, unique: false },
}));

exports.ProfileImage = ProfileImage;