var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var topic = "";

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    //send all old messages
    messages.forEach(function (msg) {
        socket.send(msg);
    });

    socket.send("*** Topic is \'" + topic + "\' ***");
    socket.on('message', function (data) {
        console.log('message recieved: ' + data);
        //if the message begins w/ '/topic'
        if(data.substring(0, 6) === '/topic') {
            topic = data.substring(7);
            newData = "*** Topic has changed to \'" + topic + "\' ***"
        //else save the message in messages
        } else {
            messages.push(data);
            newData = data;
        }
        //print to each client
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(newData);
        });
    });
});