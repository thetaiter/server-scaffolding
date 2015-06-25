'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    saltWorkFactor = 10;

var UserSchema = new Schema({
  name: {
    type: String,
    default: "Jesse Pinkman"
  },
  username: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true,
    match: /\b[A-z-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(saltWorkFactor, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
