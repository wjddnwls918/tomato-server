var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

let jwt = require('jsonwebtoken');

//// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {

  swagger: "2.0",

  info: { // API informations (required)
    title: 'Tomato API Document', // Title (required)
    version: '0.0.1', // Version (required)
    description: 'This is Tomato REST API Document' // Description (optional)
  },

  host: '192.249.19.125:6580', // Host (optional)
  //basePath: '/' // Base path (optional)
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { jwt: [] }
  ]

};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  //apis: ['./routes/*.js']
  apis: ['./swagger/api.yaml']
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//var sequelize = require('./models').sequelize;
//sequelize.sync();



/*
const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('jj','root','q1w2e3r4t5',{
 host : 'localhost',
 port : '3306'
});

auto.run((err) => {
	if(err) throw err;
});

*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routing
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
