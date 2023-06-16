const { Schema, model } = require("mongoose");


const Comments = model('Comments', Schema({
    name: { type: String, required: false, unique: false },
    comment: { type: String, required: false, unique: false },
    rating: { type: String, required: false, unique: false },
}));

exports.Comments = Comments;


