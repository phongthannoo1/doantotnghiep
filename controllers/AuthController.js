var mongoose = require("mongoose");
var passport = require("passport");
var session = require('express-session');
var path = require('path');
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  if(typeof req.session.passport ==="undefined"){ 
  res.redirect('/admin/login');
  }
  else
  {
    if(typeof req.session.passport.user ==="undefined"){
        res.redirect('/admin/login');
    }
    res.render('admin/adminpage');
  }
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  console.log('registering user');
  User.register(new User({ username : req.body.username, password: req.body.password, studentid: req.body.studentid}), req.body.password, function(err, user) {
    if (err) {
      console.log(err.message)
      return res.render('register', {error:err.message, user: null});
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('admin/admin-login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local', { successReturnToOrRedirect: 'http://localhost:3002/admin/overview', failureRedirect: 'http://localhost:3002/admin/login' })(req, res, function () {
    console.log('day la passport');
    console.log(session.passport);
    res.redirect('/admin/overview');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/admin/overview');
};

module.exports = userController;