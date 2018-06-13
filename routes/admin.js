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
router.get('/',tour.gettrongnuoc);

router.get('/overview', admin.getall );

router.get('/login', auth.login);

router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

router.get('/themchuyen', admin.insertchuyendi);

router.get('/themchuyen/:matour', admin.insertchuyendi);

router.post('/themchuyen', admin.doinsertchuyendi);

router.get('/themtour', tour.getinserttour);

router.post('/themtour', tour.inserttour);

router.get('/danhsachtour', admin.gettabletour );

router.get('/danhsachchuyendi', admin.gettablechuyendi );

router.get('/danhsachchuyendithongke', admin.gettablechuyendithongke );

router.post('/danhsachchuyendithongke', admin.gettablechuyendithongke );

router.get('/danhsachhoadon', admin.gettablehoadon );

router.get('/danhsachhoadonthongke', admin.gettablehoadonthongke );

router.post('/danhsachhoadonthongke', admin.gettablehoadonthongke );

router.get('/danhsachhoadonajax', admin.gettablehoadonajax );

router.get('/danhsachhoadonajax2', admin.gettablehoadonajax2 );

module.exports = router;
