const mongoose = require('mongoose')
// Creating mongoose  model
const BlogSchema = new mongoose.Schema({
    bid : {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
     type: String,
     required: true
     },
     date: {
       type: Date,
       default: Date.now
     }
 });
 module.exports = mongoose.model('blogs', BlogSchema);