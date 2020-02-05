
var express = require('express');

var app = express();
const Port = process.env.PORT || 3000 ; //|| 3000
var server = app.listen(Port);

app.use(express.static('public'));

console.log("socket server running");

var socket = require('socket.io');

var io = socket(server); // incoming outgoing msgs

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: '+ socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse',data); // also include the msg from the sender
        console.log(data);

    }
}