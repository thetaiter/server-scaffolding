'use strict';

module.exports = function(done) {
    var serv = require('../server.js'),
        port = serv.port,
        server = serv.server;

    function shutdown(signal) {
        if (signal) {
            console.warn('\b\bCaught %s, killing server gracefully.'.yellow, signal);
        } else {
            console.log('Server is shutting down now...');
        }

        server.close();

        return done();
    }

    server.on('error', function(err) {
        if (err.message === 'listen EADDRINUSE') {
            console.error('%s'.red, err);
            console.error('\nIt\'s possible that port %s is in use. Perhaps you already have a server running on this port?\n', port);
        } else {
            console.error(('\n' + err).red);
        }

        return done(false);
    });

    process.on('SIGINT', function() {
        return shutdown('SIGINT');
    });

    // Handler for when the server is externally killed with 'kill' or 'killall' ('kill -9' produces the SIGKILL signal and cannot be caught by any process)
    process.on('SIGTERM', function() {
        return shutdown('SIGTERM');
    });

    process.on('SIGQUIT', function() {
        return shutdown('SIGQUIT');
    });
};

