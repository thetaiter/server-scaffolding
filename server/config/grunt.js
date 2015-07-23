'use strict';

module.exports = {
    pkg: require('../package.json'),
    githooks: {
        all: {
            'pre-commit': 'jshint'
        }
    },
    jshint: {
        all: {
            src: ['Gruntfile.js', 'app/**/*.js', 'config/**/*.js', 'model/**/*.js', 'public/javascripts/**/*.js', 'routes/**/*.js', 'tests/**/*.js', 'tasks/**/*.js', 'bin/**/*.js'],
            options: {
                jshintrc: true
            }
        }
    },
    mochaTest: {
        all: {
            options: {
                reporter: 'spec'
            },
            src: ['tests/**/*_test.js']
        }
    }
};