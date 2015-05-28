module.exports = function(done) {
    'use strict';

    var express = require('express'),
        app = express(),
        default_port = process.env.PORT || 3000;

    app.get('/', function(req, res) {
        res.send('Hello world!');
    });

    var server = app.listen(default_port, function() {
        var host = server.address().address;
        var port = server.address().port;

        if (host === '::') {
            host = 'localhost';
        }
 
        console.log('\nTest NodeJS Express server listening at http://%s:%s\n', host, port);
    });

    server.on('error', function(err) {
        if (err.message === 'listen EADDRINUSE') {
            console.error('\nPort %s is in use. Perhaps you already have a server running on this port?\n', default_port);
            done(false);
        }

        console.log(err.message);
        done(false);
    });

    process.on('SIGINT', function() {
        console.log('\b\bCaught SIGINT, killing server.');
        server.close();
        done();
    });
};
