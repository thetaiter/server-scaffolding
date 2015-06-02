'use strict';

function createJSON(key, value) {
    return JSON.parse('{'+ JSON.stringify(key) + ':' + JSON.stringify(value) + '}');
}

function getArgumentNames(task){
    var reg = /\(([\s\S]*?)\)/,
        fs = require('fs'),
        args = [''];

        try {
            args = reg.exec(require('./' + task))[1].split(', ');
        } catch (e) {
            // Left empty intentionally... getting here means the task is not a custom task in the 'tasks' directory
        }

        return args;
}

module.exports = function(grunt, task, done) {
    var tasks = grunt.task._tasks,
        _task = tasks[task];

    if (!_task) {
        if (task === undefined) {
            task = 'undefined';
        }

        console.log('No grunt task found with the name \'%s\'.\n'.red, task.bold);
        return done(false);
    }

    var help,
        jf = require('jsonfile');

    try {
        help = require('./help.json');
    } catch (err) {
        console.warn('No help file found, creating one now.\n'.yellow);

        jf.writeFileSync('./tasks/help.json', []);
        help = require('./help.json');
    }

    for (var i = 0; i < help.length; i++) {
        if (help[i][task]) {
            console.error('Help entry already exists for this task.\n'.red);
            return done(false);
        }
    }

    var args = getArgumentNames(task);

    jf.spaces = 2;

    if (_task.info.indexOf('Alias') === -1 && _task.meta.info.indexOf('Npm') === -1 && !(args.length === 1 && args[0] === '')) {
        var prompt = require('prompt');

        if (args[0] === 'grunt'){
            args = args.splice(1, args.length);
        }

        if (args[args.length-1] === 'done') {
            args = args.splice(0, args.length-1);
        }

        for (var j = 0; j < args.length; j++) {
            args[j] = args[j] + '" -> ';
        }

        prompt.message = 'Input description for argument "';
        prompt.delimiter = '';
        prompt.colors = false;

        prompt.start();

        console.log('Creating help entry for task \'%s\'...\n', task);

        return prompt.get(args, function(err, answers) {
            if (err) {
                console.error(err.toString().red + '\n');
                return done(false);
            }

            help.push(createJSON(task, createJSON('description', _task.info)));

            answers = JSON.stringify(answers).replace(/\\" -> /g, '');
            help[help.length - 1][task].args = JSON.parse(answers);

            console.log();

            prompt.message = 'Input number of examples';

            return prompt.get(' -> ', function (err, answer) {
                if (err) {
                    console.error(err.toString().red + '\n');
                    return done(false);
                }

                var numExamples = answer[' -> '],
                    examples = [];

                for (var k = 0; k < numExamples; k++) {
                    examples.push(' #' + (k+1) + ' -> ');
                }

                prompt.message = 'Input example';

                return prompt.get(examples, function(err, exampleAnswers) {
                    if (err) {
                        console.error(err.toString().red + '\n');
                        return done(false);
                    }

                    examples = [];
                    var l = 1;

                    for (var example in exampleAnswers) {
                        if (exampleAnswers.hasOwnProperty(example)) {
                            examples.push(exampleAnswers[' #' + l + ' -> ']);
                            l++;
                        }
                    }

                    help[help.length - 1][task].examples = examples;

                    if (!Object.keys(help[help.length - 1][task].args).length) {
                        delete help[help.length - 1][task].args;
                    }

                    return jf.writeFile('./tasks/help.json', help, function (error) {
                        if (error) {
                            console.error('\nThere was an error writing to the help.json file:\n\n\t%s'.red, error);
                            return done(false);
                        } else {
                            console.log('\nEntry written to help.json successfully.');
                            return done();
                        }
                    });
                });
            });
        });
    } else {
        console.log('Task is an alias or an NPM task, or the task does not take any arguments.\nCreating help entry with description and example...\n');

        var entry = {};

        entry[task] = {
            description: _task.info,
            examples: ['grunt ' + task]
        };

        help.push(entry);

        return jf.writeFile('./tasks/help.json', help, function(error) {
            if (error) {
                console.error('There was an error writing to the help.json file:\n\n\t%s'.red, error);
                return done(false);
            } else {
                console.log('Entry written to help.json successfully.');
                return done();
            }
        });
    }
};

