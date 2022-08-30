var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authentication')
var rolesRouter = require('./routes/roles')
var userRoleRouter = require('./routes/userRole')
var permissionRouter = require('./routes/permission')
var permissionRoleRouter = require('./routes/permissionRole')
var userActivitiesRouter = require('./routes/userActivities')
var logUserActivityMiddleware = require('./controllers/userActivity/userActivityMiddlewares')

var baseResponse = require('./models/responses/baseResponse')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logUserActivityMiddleware.logActivity)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter)
app.use('/user-role',userRoleRouter)
app.use('/permission',permissionRouter)
app.use('/permission-role',permissionRoleRouter)
app.use('/user-activities',userActivitiesRouter)
app.use('/authentication',authRouter)

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
