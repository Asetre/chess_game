const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()
//const io = require('socket.io')(server);

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')

const passportConfig = require('./config/passport.js')()

var {PORT, databaseURL} = require('./config/config');

mongoose.Promise = global.Promise

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(router)

//Routes
const routes = require('./routes.js')
routes(router)


var serv;

function runServer() {
    mongoose.connect(databaseURL)
    .then(() => {
        serv = http.listen(8000, () => {
            console.log('app is listening on port: 8000')
        })
    })
    .catch(err => {
        console.log(err)
        mongoose.disconnect()
    })
}

function closeServer() {
    mongoose.disconnect()
    .then(() => {
        serv.close()
    })
    .catch(err => {
        console.log(err)
    })
}
//// For testing
//function runServer(port=PORT, databaseUrl=databaseURL) {
//    return new Promise(function(resolve, reject) {
//        mongoose.connect(databaseUrl, function(err) {
//            if(err) {
//                return reject(err);
//            }
//            serv = server.listen(port, function() {
//                console.log(`App is listening on ${port}`);
//            })
//            .on('error', function(err) {
//                mongoose.disconnect();
//                reject(err);
//            });
//        });
//    })
//}
//
//function closeServer() {
//    return mongoose.disconnect().then(function() {
//        return new Promise(function(resolve, reject) {
//            console.log('closing server');
//            serv.close(function(err) {
//                if(err) {
//                    return reject(err);
//                }
//                resolve();
//            });
//        });
//    });
//}
//
if(require.main === module) {
    runServer();
}
//module.exports = {runServer, closeServer};
