var fs = require('fs');
var options = {
    key: fs.readFileSync('E:/ssl/myserver.key'),
    cert: fs.readFileSync('E:/ssl/myserver.crt'),
    passphrase: '1234'
};

var https = require('https');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World Expressjs');
});

var server = https.createServer(options, app);
server.listen(8084);
console.log('Server is running on port 8084');