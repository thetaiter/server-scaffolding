'use strict';

module.exports = function(task) {
    if (!task) {
        console.error('Please input a task to receive help info for.\n'.red);
        console.error('Run \'grunt available_tasks\' to get a list of all grunt tasks.\n');

        return false;
    }

    var help;

    try {
        help = require('./help.json');
    } catch (err) {
        console.error('No help file found, creating one now.\n'.red);
        console.error('Run \'grunt create_help:%s\' to easily create a help entry for this grunt task.\n', task);

        var jf = require('jsonfile');

        jf.writeFileSync('./tasks/help.json', []);

        return false;
    }

    var delimiter = ' - ';

    for (var i = 0; i < help.length; i++) {
        var t = help[i][task];

        if (t) {
            console.log('\nHelp entry for \'' + task.bold + '\'');
            console.log('\n    Description' + delimiter + t.description);

            if (t.args) {
                var args = t.args;

                console.log('    Arguments' + delimiter);

                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        console.log('\t' + key + delimiter + args[key]);
                    }
                }
            }

            if (t.examples) {
                if (t.examples.length > 0) {
                    var title = '    Example';

                    if (t.examples.length === 1) {
                        console.log(title + delimiter + t.examples[0]);
                    } else {
                        title = title + 's';

                        console.log(title + delimiter);

                        for (var k = 0; k < t.examples.length; k++) {
                            console.log('\t' + t.examples[k]);
                        }
                    }
                }
            }

            return true;
        }
    }

    console.error('A help entry does not exist for grunt task \'%s\'.\n'.red, task.bold);
    console.error('Run \'grunt create_help:%s\' to easily create a help entry for this grunt task.\n', task);

    return false;
};

