const mongoose = require('mongoose')
// Creating mongoose  model
const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
     type: String,
     required: true
     },
     date: {
       type: Date,
       default: Date.now
     }
 });
 module.exports = mongoose.model('messages', ContactSchema);