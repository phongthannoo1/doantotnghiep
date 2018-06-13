var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var path = require('path');
var Tour = require("../models/Tour");

var auth = require("../controllers/AuthController.js");
var tour = require("../controllers/TourController.js");
var admin = require("../controllers/AdminController.js");

// restrict index for logged in user only  tour.getall  auth.home
router.get('/', tour.getall );

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

router.get('/danhsachtrongnuoc',tour.gettrongnuoc);

router.get('/danhsachnuocngoai',tour.getnuocngoai);

//router.get('/hot',tour.gethot);

//get dattour
//router.get('/dattour/:matour',tour.dattour);

//post dattour
//router.post('/dattour',tour.dattour);

//route for insert and upload tour
//router.post('/upload', tour.insert);

router.get('/:qtentour',tour.getone);

module.exports = router;
