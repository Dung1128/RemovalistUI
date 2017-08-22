'use strict';

const express = require('express');
const config = require('./configuration.json');
const TokenProvider = require('./js/token-provider');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');


const app = express();

app.set('json spaces', 2);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/chat-client-configuration.json', function(req, res) {
  if (config.chatClient) {
    res.json(config.chatClient);
  } else {
    res.json({});
  }
});

app.get('/configuration', function(req, res) {
  if (config) {
    res.json(config);
  } else {
    res.json({});
  }
});

app.get('/token', function(req, res) {
  if (req.query.identity) {
    const endpointId = 'Removalist' + ':' + req.query.identity + ':' + req.query.deviceId;
    res.send(TokenProvider.getToken(req.query.identity, endpointId));
  } else {
    throw new Error('no `identity` query parameter is provided');
  }
});

app.listen(3000, function() {
  console.log('Token provider listening on port 3000!');

  let ngrokOptions = {
    proto: 'http',
    addr: 3000
  };
  if (config.ngrokSubdomain) {
    ngrokOptions.subdomain = config.ngrokSubdomain
  }

  ngrok.connect(ngrokOptions);
});


// if (process.env.NODE_ENV !== 'test') {
//   require('dotenv').config()
// }

// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var home = require('./routes/home');
// var token = require('./routes/token');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.set('port', (process.env.PORT || 3333))

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', home);
// app.use('/token', token);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err,
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//   });
// });

// // module.exports = app;

// app.listen(app.get('port'), () => {
//   //eslint-disable-next-line no-console
//   console.log('Express is listening on port ' + app.get('port') + '!')
// })
