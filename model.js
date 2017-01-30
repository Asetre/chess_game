const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    level: {type: Number, required: true},
    experience: {type: Number, required: true},
    class: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
