'use strict';

module.exports = function(done) {
    var server = require('../app/server.js');

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

