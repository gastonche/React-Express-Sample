var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connect  = require('./db/connect');
var socketIO = require('socket.io');
var handleSocketConnection = require('./socket');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var accountsRouter = require('./routes/account');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connect();

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/auth', accountsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
