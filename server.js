const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const stringify = require('node-stringify');

var port = process.env.PORT || 8000;


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

io.on('connection', function(socket) {
    console.log('new connection');
    socket.on('movedPiece', function(data) { 
        io.emit('updateBoard', data);
    });
});


server.listen(port, function() {
    console.log(`App is listening on port: ${port}`);
});
