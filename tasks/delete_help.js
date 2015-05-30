'use strict';

module.exports = function(task, done) {
    if (!task) {
        console.error('Please enter a valid grunt task to delete the help entry of.\n'.red);
        return done(false);
    }

    var help = require('./help.json'),
        index = -1;

    help.forEach(function(t, i) {
        if (t[task]) {
            index = i;
        }
    });

    if (index > -1) {
        help.splice(index, 1);

        var jf = require('jsonfile');

        jf.spaces = 2;

        return jf.writeFile('./tasks/help.json', help, function(err) {
            if (err) {
                console.error('%s'.red, err);
                return done(false);
            }

            console.log('Help entry for grunt tast "%s" was deleted successfully.', task);

            return done();
        });
    }

    console.error('No task found with the name "%s". Please enter a valid grunt task.\n'.red, task.bold);
    return done(false);
};

