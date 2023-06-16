const { Schema, model } = require("mongoose");


const Payment = model('Payment', Schema({
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: false },
    nagad: { type: String, required: false, unique: false },
    bkash: { type: String, required: false, unique: false },
    rocket: { type: String, required: false, unique: false },
    amount: { type: String, required: false, unique: false },
    transid: { type: String, required: false, unique: false },
    course_code: { type: String, required: false },
    reff_no: { type: String, required: false },
    recipept_image: { type: String, required: false },
    date: { type: String, required: false },
    time: { type: String, required: false },

}));

exports.Payment = Payment;


