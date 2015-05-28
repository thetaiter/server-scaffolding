'use strict';

module.exports = function(done) {
    var server = require('../server.js');

    process.on('SIGINT', function() {
        console.log('\b\bCaught SIGINT, killing server gracefully.'.yellow);
        server.close();
        done();
    });
};
