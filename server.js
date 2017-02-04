const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;

//User node Promise instead of mongoose promise

//Configs
var {PORT, databaseURL} = require('./config/config');


//Set view engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);
require('./routes/routes')(app, io, passport);


// For testing
var serv;
function runServer(port=PORT, databaseUrl=databaseURL) {
    return new Promise(function(resolve, reject) {
        mongoose.connect(databaseUrl, function(err) {
            if(err) {
                return reject(err);
            }
            serv = server.listen(port, function() {
                console.log(`App is listening on ${port}`);
            })
            .on('error', function(err) {
                mongoose.disconnect();
                reject(err);
            });
        });
    })
}

function closeServer() {
    return mongoose.disconnect().then(function() {
        return new Promise(function(resolve, reject) {
            console.log('closing server');
            serv.close(function(err) {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if(require.main === module) {
    runServer();
}

module.exports = {runServer, closeServer};
