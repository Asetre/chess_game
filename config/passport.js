const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/users');

module.exports = function(passport) {
    //Session setup

    //Serialize user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deSerialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Strategy
    passport.use(new FacebookStrategy({
        clientID: 1658951590816760,
        clientSecret: 1464725ae041f1650b3adde74f21e511,
        callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({facebook.id: profile.id})
        .then(user => {
            if(!user) return 'user was not found'
            if(user) return user
            let newUser = new User()
            newUser.facebook.id = profile.id
            newUser.facebook.token = accessToken
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
            newUser.facebook.email = profile.emails[0].value
            newUser.save(err => {
                if(err) throw err
                return newUser
            })
        })
    }
));}
