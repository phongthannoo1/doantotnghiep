var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/doandb')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var timkiem = require('./routes/timkiem');
var admin = require('./routes/admin');
var dattour = require('./routes/dattour');
var edit = require('./routes/edit');


var app = express();
//session setup
app.use(require('express-session')({
  secret: 'authen',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
        res.locals.session = req.session;
        next();
});
var User = require('./models/User');
//passport.use(new LocalStrategy(User.authenticate()));
/*passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser(
  function(user, done) {
  done(null, user);
}));
passport.deserializeUser(User.deserializeUser());
*/
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username, password:password }, function(err, user) {
      if (err) { return done(err); }
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', index);
app.use('/users', users);
app.use('/timkiem/',express.static(path.join(__dirname, 'public')), timkiem);
app.use('/admin', admin);
app.use('/dattour',express.static(path.join(__dirname, 'public')), dattour);
app.use('/admin/edit',express.static(path.join(__dirname, 'public')), edit);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
