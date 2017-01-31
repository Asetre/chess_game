const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    level: {type: Number, required: true},
    experience: {type: Number, required: true},
    classType: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

//Check if username is unique
userSchema.pre('save', function(next, done) {
    var self = this;

    mongoose.models['User'].findOne({username: self.username}, function(err, results) {
        if(err) {
            done(err);
        }else if(results) {
            self.invalidate('username', 'username must be unique');
            done(new Error('username must be unique'));
        }else {
            done();
        }
    });
    next();
});

module.exports = {User};
