'use strict';

module.exports = function(grunt) {
    /*
        Grunt initialize function call, passing in the configuration JSON object
    */
    grunt.initConfig(require('./config/grunt'));

    /*
        Load the NPM tasks
    */
    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    /*
        Register custom tasks

        Help:
            Use the line 'var done = this.async();' at the beginning of a task to inform grunt that your task is
            asyncronous. You can then pass the 'done' variable to whatever functions you wish, and the grunt task will
            end successfully when you call 'done()'. If you wish for the grunt task to fail, call 'done(false)'.

            The convention I have used here for calling tasks was done to minimize the size of the Gruntfile. If all
            task code were to be in this file it would be enormous, so each task's code is in it's own file in the
            'tasks' folder. Conventionally, the name of the file should be the same as the name of the grunt task. If
            you need a good example of how a simple task is set up, check out the 'available_tasks' task below. There is
            also an 'available_tasks.js' file in the 'tasks' folder that you can use as a guide for making simple tasks.

            Finally, once you have created a grunt task successfully, please create a help entry for it. This is a good
            habit to get into, especially if you will be developing with other people. Fortunately, I have created a
            grunt task to do the job for you! Just run 'grunt help:create_help' to see how to create a help entry.
    */
    grunt.registerTask('default', 'Alias for the \'jshint\' and \'mochaTest\' tasks.' , ['jshint', 'mochaTest']);

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
};

