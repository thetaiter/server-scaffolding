'use strict';

var supertest = require('supertest'),
    chai= require('chai'),
    assert = chai.assert,
    api = supertest(require('../app/app')),
    mongoose = require('mongoose');

describe('Home', function() {
    it('should repsond with with 200', function(done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});

describe('Users', function() {
    this.timeout(5000);

    it('should repsond with with 200', function(done) {
        api.get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) {
                    return done(err);
                }

                return done();
            });
    });

    it('should respond with 200', function(done) {
        api.get('/users/new')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                return done();
            });
    });

    it('should post a user to the database and respond with 302, redirecting to /users', function(done) {
        api.post('/users')
            .send({
                name: 'Test User',
                username: 'testuser1',
                email: 'testuser@test.com',
                password: 'testPassword'
            })
            .expect(302)
            .expect('location', '/users')
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                mongoose.model('User').findOne({username: 'testuser1'}, function(err, user) {
                    assert.equal(user.name, 'Test User');
                    assert.equal(user.username, 'testuser1');
                    assert.equal(user.email, 'testuser@test.com');

                    user.comparePassword('testPassword', function(err, isMatch) {
                        if (err) {
                            return done(err);
                        }

                        assert.equal(isMatch, true);

                        return done();
                    });
                });
            });
    });
});