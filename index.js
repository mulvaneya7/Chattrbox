var http = require('http');
//Node.js file system module
var fs = require("fs");
var extract = require('./extract');
//MIME type
const mime = require('mime/lite');
var wss = require('./websockets-server');

var handleError = function (err, res) {
    res.writeHead(404);
    fs.readFile('app/error.html', function (err, data) {
        res.end(data);
    })
}

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if(err) {
            handleError(err, res);
            return;
        } else {
            console.log('request for: ' + mime.getType(filePath));
            res.end(data);
        }
    });

});
server.listen(3000);