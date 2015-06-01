'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        githooks: {
            all: {
                'pre-commit': 'jshint nodeunit'
            }
        },
        jshint: {
            all: {
                src: ['Gruntfile.js', 'server.js', 'tests/**/*.js', 'tasks/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodeunit: {
            all: ['tests/*_test.js'],
            options: {
                reporter: 'default'
            }
        },
        forever: {
            server: {
                options: {
                    index: 'server.js',
                    logDir: 'logs',
                    errFile: 'error.log',
                    outFile: 'out.log',
                    logFile: 'log.log'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-forever');

    grunt.registerTask('default', 'Alias for \'jshint\', \'nodeunit\', and \'forever\' tasks.' , ['jshint', 'nodeunit', 'forever']);

    grunt.registerTask('available_tasks', 'List all available grunt tasks', function(sorted) {
        return require('./tasks/available_tasks')(grunt, sorted);
    });

    grunt.registerTask('create_help', 'Creates a help entry for the specified grunt task.', function (task) {
        var done = this.async();
        return require('./tasks/create_help')(grunt, task, done);
    });

    grunt.registerTask('delete_help', 'Delete the help entry for the specified grunt task.', function(task) {
        var done = this.async();
        return require('./tasks/delete_help')(task, done);
    });

    grunt.registerTask('help', 'View the help entry for the specified grunt task.', function(task) {
        return require('./tasks/help.js')(task);
    });

    grunt.registerTask('run', 'Run the server.', function() {
        var done = this.async();
        return require('./tasks/run.js')(done);
    });
};

