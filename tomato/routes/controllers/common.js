/*
  Start of common Controller



*/

var express = require('express');
var router = express.Router();

var userModel = require('../../models').users;

let jwt = require('jsonwebtoken');

let makeJWTToken = function(email) {
  return jwt.sign({
    email: email
  },
  secretObj.secret,
  {
    expiresIn : '5m'
  }
  );
}

//const {User} = require('../models');

router.get('/', function(req, res, next) {
  res.send('This is response of Common');
});


//router.post()

//토큰 재발급
//

module.exports = router;
