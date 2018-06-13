var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var Tour = require("../models/Tour");

var auth = require("../controllers/AuthController.js");
var tour = require("../controllers/TourController.js");
var admin = require("../controllers/AdminController.js");

//hang cua timkiem.js
router.post('/ketqua',tour.timkiem);

//hang cua tim kiem.js
router.get('/:matour',admin.getedittour);

router.post('/:matour',admin.edittour);

module.exports = router;
