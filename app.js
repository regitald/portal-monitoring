var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authentication')
var rolesRouter = require('./routes/roles')
var permissionRouter = require('./routes/permission')
var permissionRoleRouter = require('./routes/permissionRole')
var userActivitiesRouter = require('./routes/userActivities')
var moRouter = require('./routes/planning')
var logUserActivityMiddleware = require('./controllers/userActivity/userActivityMiddlewares')
var productionResultRouter = require('./routes/productionResult')
var maintenanceRouter = require('./routes/maintenance')
var machine = require('./routes/machine')
var viewLogin = require('./routes/view/login')
var path = require('path');
var fileUpload = require('express-fileupload');
var {createDoc} = require('./utils/PdfGenerator/pdfGenerator')
var cors = require('cors')
const {expressjwt} = require('express-jwt')
const key = process.env.JWT_KEY

var baseResponse = require('./models/responses/baseResponse')
var app = express();
app.use(cors())

app.use(fileUpload({
  createParentPath: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/login',viewLogin)

app.use('/api/auth',authRouter)

// app.use(expressjwt({ secret: key,algorithms: ["HS256"] }))
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter)
app.use('/api/permission',permissionRouter)
app.use('/api/permission-role',permissionRoleRouter)
app.use('/api/user-activities',userActivitiesRouter)
app.use('/api/planning',moRouter)
app.use('/api/maintenance',maintenanceRouter)
app.use('/api/production/result',productionResultRouter)
app.use('/api/machine',machine)

app.use(logUserActivityMiddleware.logActivity)

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
  res.status(err.status || 500).send(baseResponse(err.message));
});

createDoc()
module.exports = app;
