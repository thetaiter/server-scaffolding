'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['Gruntfile.js', 'server.js', 'tests/**/*.js', 'tasks/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodeunit: {
            all: ['tests/*_test.js'] 
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', 'Alias for \'jshint\' and \'nodeunit\' tasks.' , ['jshint', 'nodeunit']);

    grunt.registerTask('available_tasks', 'List all available grunt tasks', function(sorted) {
        return require('./tasks/available_tasks')(grunt, sorted);
    });

    grunt.registerTask('create_help', 'Creates a help entry for the specified grunt task.', function (task) {
        var done = this.async();
        return require('./tasks/create_help')(grunt, task, done);
    });

    grunt.registerTask('help', 'View the help entry for the specified grunt task.', function(task) {
        return require('./tasks/help.js')(task);
    });
};
