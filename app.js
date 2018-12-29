var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars')//VIEW ENGINE
var mongoose = require('mongoose')
var session = require('express-session')//session handling
var passport = require('passport')//for authentication
var flash = require('connect-flash')//flash messages
var validator = require('express-validator')
var MongoStore = require('connect-mongo');//for storing sessions
var methodOverride = require('method-override'); //for post as a delete

//establishing connection mongoDB database
mongoose.connect('mongodb://localhost:27017/liveScore')

var app = express();

//import routes files
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var displayMatchRouter = require('./routes/display_match_maker');
var categoryScoreRouter = require('./routes/category_score');

//IMPORT PASSPORT CONFIGURATION FILE
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({
  defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({   //SESSION IS ENABLED HERE, REQUIRED FOR CSRF TOKEN
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 180 * 60 * 1000} // minutes * seconds * miliseconds
}))
app.use(flash())
app.use(passport.initialize())//initializing the authentication
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

//method override middleware
app.use(methodOverride('_method'));

//THIS MAKES THE VARIABLE LOCAL TO EVERYONE(GLOBAL)
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();//makes isLogin available to views
  res.locals.session = req.session;
  next();
})

//routing middlewares
app.use('/admin', adminRouter);
app.use('/', indexRouter);
app.use('/display', displayMatchRouter);
app.use('/score', categoryScoreRouter);

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
