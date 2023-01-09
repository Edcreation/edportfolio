const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



// Creating mongoose  model
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
    }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', UserSchema);