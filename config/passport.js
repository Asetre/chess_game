const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users.js')

var FACEBOOK_APP_ID = '1658951590816760'
var FACEBOOK_APP_SECRET = '1464725ae041f1650b3adde74f21e511'

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findOne({"local.username": username})
            .then(user => {
                if(!user) return done(null, false)
                if(!user.validPassword(password)) return done(null, false)
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
        }
    ));
}
