'use strict';

module.exports = function(done) {
    var serv = require('../app/server.js'),
        port = serv.port,
        server = serv.server;

    // Server errors handled here, in order to call 'done' function from grunt
    server.on('error', function(err) {
        if (err.message === 'listen EADDRINUSE') {
            console.error('%s'.red, err);
            console.error('\nIt\'s possible that port %s is in use. Perhaps you already have a server running on this port?\n', port);
        } else {
            console.error(('\n' + err).red);
        }

        return done(false);
    });

    //
    // Override default signal handlers to properly shutdown the server.
    //

    process.on('SIGINT', function() {
        process.exit('SIGINT');
    });

    // Handler for when the server is externally killed with 'kill' or 'killall' ('kill -9' produces the SIGKILL signal and cannot be caught by any process)
    process.on('SIGTERM', function() {
        process.exit('SIGTERM');
    });

    process.on('SIGQUIT', function() {
        process.exit('SIGQUIT');
    });

    process.on('exit', function(exitSignal) {
        if (exitSignal === 'SIGINT' || exitSignal === 'SIGTERM' || exitSignal === 'SIGQUIT') {
            console.warn('\b\bCaught %s, killing server.\n'.yellow, exitSignal);
        }

        console.log('Server is shutting down now...');
        server.close();
        console.log('Done.\n');

        return done();
    });
};

