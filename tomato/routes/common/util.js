
var jwt = require('jsonwebtoken');
require('dotenv').config();

var util = {};

util.makeJSON = function(key, value) {
  let result = {};
  result[key] = value;
  return result;
}

util.tokenStringToArray = function(tokenString) {
  let splitString = tokenString.split('/');

  console.log(typeof(splitString));
  console.log(splitString.length);

  let result = [];

  for(let i = 0; i < splitString.length; i++){
    result.push(splitString[i]);
  }

  return result;
}

util.makeJWTToken = function(email) {

  console.log(process.env.JWT_SECRET);

  return jwt.sign({
    email: email
  },
  process.env.JWT_SECRET,
  {
    expiresIn : '30m'
  }
  );
};

util.successTrue = function(code,data){ //1
  return {
    code: code,
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = function(code, err, message){ //2
  if(!err&&!message) message = 'data not found';
  return {
    code: code,
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = function(errors){ //3
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares
util.isLoggedin = function(req,res,next){ //4
  var token = req.headers['x-access-token'];
  if (!token) return res.json(util.successFalse(400,null,'token is required!'));
  else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) return res.json(util.successFalse(400,err));
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = util;
