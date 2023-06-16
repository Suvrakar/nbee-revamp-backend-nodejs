const { Schema, model } = require("mongoose");


const Users_Nbee102 = model('Users_Nbee102', Schema({
    user_name: { type: String, required: true, unique: false },
    user_email: { type: String, required: true, unique: true },
    quiz1_nbee102: { type: String, required: false, unique: false },
    quiz2_nbee102: { type: String, required: false, unique: false },
    comment: { type: String, required: false, unique: false },
    rating: { type: String, required: false, unique: false },
    nbee102_paymentStatus: { type: String, required: false },
}));

exports.Users_Nbee102 = Users_Nbee102;


