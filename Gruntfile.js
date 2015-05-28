'use strict';

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['Gruntfile.js', 'server.js', 'app/**/*.js', 'config/*.js', 'public/js/**/*.js', 'tasks/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodeunit: {
            all: ['test/**/*_test.js'],
            options: {
                reporter: 'default'
            }
        }
    });

    // Load npm plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Default task
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    // My custom tasks
    grunt.registerTask('my_task', function() {
        console.log('\nHaha!\n');
    });
};
