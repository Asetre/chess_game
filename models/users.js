const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    level: {type: Number, required: true},
    classType: {type: String, required: true},
    expreiece: {type: Number}
});

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6));
}

userSchema.methods.validPassword = function(password) {
    console.log(this);
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
