const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')
var User = require('../models/userSchema');


passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,'s3cr3t', function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded.data._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));