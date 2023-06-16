const { Schema, model } = require("mongoose");


const Courses = model('Courses', Schema({
    name: { type: String, required: false, unique: false },
    course_id: { type: String, required: false, unique: false },
    instructor: { type: String, required: false, unique: false },
    course_fee: { type: String, required: false, unique: false },
    courese_desc: { type: String, required: false, unique: false },
    courese_banner: { type: Buffer, required: false, unique: false },
    courese_banner_type: { type: String, required: false, unique: false },
    courese_language: { type: String, required: false, unique: false },
}));

exports.Courses = Courses;


