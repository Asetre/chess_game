const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

const router = express.Router()

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')


const passportConfig = require('./config/passport.js')()
const socketFiles = require('./socket.js')(io)

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
        serv = http.listen(3000, () => {
            console.log('app is listening on port: 3000')
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
if(require.main === module) {
    runServer();
}
//module.exports = {runServer, closeServer};
