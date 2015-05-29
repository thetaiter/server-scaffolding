'use strict';

module.exports = function(done) {
    var server = require('../server.js'),
        port = server.port,
        server = server.server;

    server.on('error', function(err) {
        if (err.message === 'listen EADDRINUSE') {
            console.error('\nERROR: Port %s is in use. Perhaps you already have a server running on this port?\n'.red, port);
        } else {
            console.error('\n', err);
        }

        done(false);
    });

    process.on('SIGINT', function() {
        console.log('\b\bCaught SIGINT, killing server gracefully.'.yellow);
        server.close();
        done();
    });
};
