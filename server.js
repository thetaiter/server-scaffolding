var express = require('express'),
    app = express(),
    default_port = 3000;

app.get('/', function(req, res) {
    res.send('Hello world!');
});

var server = app.listen(default_port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('\nTest NodeJS Express server listening at http://%s:%s\n', host, port);
});

server.on('error', function(err) {
    if (err.message === 'listen EADDRINUSE')
    console.error('\nPort %s is in use. Perhaps you already have a server running on this port?\n', default_port);
});
