const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
