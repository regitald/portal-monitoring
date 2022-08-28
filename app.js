var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authentication')
var roles = require('./routes/roles')
var userRole = require('./routes/userRole')
var permission = require('./routes/permission')
var permissionRole = require('./routes/permissionRole')
var baseResponse = require('./models/responses/baseResponse')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', roles)
app.use('/auth',authRouter)
app.use('/user-role',userRole)
app.use('/permission',permission)
app.use('/permission-role',permissionRole)

// catch 404 and forward to error handler
app.use(function(req, res, next) {app;
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(baseResponse("endpoint not available"));
});

module.exports = app;
