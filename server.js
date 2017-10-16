const express = require('express');
const app = express();
const router = express.Router()
//const io = require('socket.io')(server);

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var {PORT, databaseURL} = require('./config/config');

//Set view engine

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(router)

//Routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'))
})
var serv;
function runServer() {
    serv = app.listen(8000)
    console.log('app is listening on port: 8000')
}

function closeServer() {
    serv.close()
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
