const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const stringify = require('node-stringify');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {BasicStrategy} = require('passport-http');
const passport = require('passport');


//User node Promise instead of mongoose promise
mongoose.Promise = global.Promise;

//Model
const {User} = require('./model.js');

//Configs
var PORT = process.env.PORT || 8000;
var databaseURL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://user:test@ds131729.mlab.com:31729/chessusers'

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

passport.use(basicStrategy);

app.use(passport.initialize());




//Passport strategy
const basicStrategy = new BasicStrategy(function(username, password, callback) {
    let user; 
    User
        .findOne({username: username})
        .exec()
        .then(function(_user) {
            user = _user;
            if (!user) {
                return callback(null, false, {message: 'Incorrect username'});
            }
            return user.validatePassword(password);
        })
    .then(function(isValid) {
        if(!isValid) {
            return callback(null, false, {message: 'Incorrect password'});
        }
        else {
            return callback(null, user);
        }
    });
});


//Routes

//Signup Page
app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        level: 1,
        experience: 0,
        classType: 'Pawn'
    }, function(err, User) {
        if(err) {
            console.log(err);
            return reject(err);
        }
    })
    .then(function(user) {
        res.send('user created');
    });
});

//Login page
app.get('/login', function(req, res) {
   res.render('login');
});




//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/public/views/index.html');
//});
//
//io.on('connection', function(socket) {
//    console.log('new connection');
//    socket.on('movedPiece', function(data) { 
//        socket.broadcast.emit('updateBoard', data);
//    });
//});

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
