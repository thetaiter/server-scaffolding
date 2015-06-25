var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;

    delete req.body._method;
    return method;
  }
}));

router.route('/')
    .get(function(req, res, next) {
      mongoose.model('User').find({}, function(err, users) {
        if (err) {
          return console.error(err);
        }

        res.format({
          html: function() {
            res.render('users/index', {
              title: 'All Users',
              users: users
            });
          },
          json: function() {
            res.json(users)
          }
        });
      });
    })
    .post(function(req, res) {
      var name = req.body.name,
          username = req.body.username,
          email = req.body.email,
          dateJoined = req.body.dateJoined,
          password = req.body.password;

      mongoose.model('User').create({
        name: name,
        username: username,
        email: email,
        dateJoined: dateJoined,
        password: password
      }, function(err, user) {
        if (err) {
          res.send('There was an error adding the user to the database.\n\n' + err);
        } else {
          console.log('POST creating new user: ' + user);
          res.format({
            html: function() {
              res.location('users');
              res.redirect('/users');
            },
            json: function() {
              res.json(user);
            }
          });
        }
      });
    });

router.get('/new', function(req, res) {
  res.render('users/new', { title: 'Add New User'});
});

router.param('id', function(req, res, next, id) {
  mongoose.model('User').findById(id, function(err, user) {
    if (err) {
      console.log(id + ' was not found');

      res.status(404);
      error = new Error('Not Found');
      error.status = 404

      res.format({
        html: function() {
          next(err);
        },
        json: function() {
          res.json({ message: err.status + ' ' + err });
        }
      });
    } else {
      console.log(user);
      req.id = id;
      next();
    }
  });
});

router.route('/:id')
    .get(function(req, res) {
      mongoose.model('User').findById(req.id, function(err, user) {
        if (err) {
          console.log('GET Error: There was a problem getting: ' + err);
        } else {
          console.log('GET Retrieving ID: ' + user._id);

          res.format({
            html: function() {
              res.render('users/show', {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                dateJoined: user.dateJoined,
                password: user.password
              });
            },
            json: function() {
              res.json(user);
            }
          });
        }
      });
    });

router.get('/:id/edit', function(req, res) {
  mongoose.model('User').findById(req.id, function(err, user) {
    if (err) {
      console.log('GET Error: There was a problem getting: ' + err);
    } else {
      console.log('GET Retrieving ID: ' + user._id);

      res.format({
        html: function() {
          res.render('users/edit', {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password
          });
        },
        json: function() {
          res.json(user);
        }
      }); 
    }
  });
});

router.put('/:id/edit', function(req, res) {
  var name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;

  mongoose.model('User').findById(req.id, function(err, user) {
    user.update({
      name: name,
      username: username,
      email: email,
      password: password
    }, function(err, userID) {
      if (err) {
        res.send('There was a problem updating the user information:' + err);
      } else {
        res.format({
          html: function() {
            res.redirect('/users/' + user._id);
          },
          json: function() {
            res.json(user);
          }
        });
      }
    });
  });
});

router.delete('/:id/edit', function(req, res) {
  mongoose.model('User').findById(req.id, function(err, user) {
    if (err) {
      return console.error(err);
    } else {
      user.remove(function(err, user) {
        if (err) {
          return console.error(err);
        } else {
          console.log('DELETE removing ID: ' + user._id);
          res.format({
            html: function() {
              res.redirect('/users');
            },
            json: function() {
              res.json({
                message: 'deleted',
                item: user
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
