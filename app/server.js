'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Hello world!');
});

var server = app.listen(port, function() {
    var host = server.address().address;

    if (host === '::') {
        host = 'localhost';
    }

    console.log('\nTest NodeJS Express server listening at http://%s:%s/\n', host, port);
});

module.exports = {
    server: server,
    port: port
};

