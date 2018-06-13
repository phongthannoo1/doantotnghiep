var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var Tour = require("../models/Tour");

var auth = require("../controllers/AuthController.js");
var tour = require("../controllers/TourController.js");

router.post('/ketqua',tour.timkiem);

router.get('/:timkiem',tour.timkiem);

module.exports = router;
