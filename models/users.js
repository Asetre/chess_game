const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    local: {
        username: {type: String, unique: true},
        password: {type: String}
    },
    facebook: {
        id: {type: String},
        token: {type: String},
        email: {type: String},
        name: {type: String}
    }
});

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
