var mongoose = require("mongoose");
var passport = require("passport");
var Tour = require("../models/Tour");
var Chuyendi = require("../models/Chuyendi");
var Hoadon = require("../models/Hoadon");

var adminController = {};


//get insertchuyendi
adminController.insertchuyendi = function(req, res) {   
    if(typeof req.params.matour!=="undefined"){
        res.locals.matour = req.params.matour;
    }
        res.render('admin/admin-showupchuyendi');
};

//post insert chuyendi
adminController.doinsertchuyendi = function(req, res) {	
  const note = new Chuyendi({
        idchuyen:req.body.idchuyen,
        matour:req.body.matour,
        ngayxp:req.body.ngayxp,
        soluong:req.body.soluong,
        dadat:req.body.dadat,
        baogom:req.body.baogom,
        khongbaogom:req.body.khongbaogom,
        luuy:req.body.luuy,
        dieukienhuytour:req.body.dieukienhuytour
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.locals.message = "Thêm Chuyến đi thành công";
        console.log(data);
        res.render('admin/admin-showupchuyendi');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
};

//route get all tour for index
adminController.getall = function(req, res) {
  if(typeof req.session.passport ==="undefined"){ 
  res.redirect('/admin/login');
  }
  else
  {
    if(typeof req.session.passport.user ==="undefined"){
        res.redirect('/admin/login');
    }
    Tour.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/adminpage');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  }
  
};

adminController.gettabletour = function(req, res) {
  if(typeof req.session.passport ==="undefined"){ 
  res.redirect('/admin/login');
  }
  else
  {
    if(typeof req.session.passport.user ==="undefined"){
        res.redirect('/admin/login');
    }
    Tour.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/admin-showtabletour');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  }
  
};

adminController.gettablechuyendi = function(req, res) {
  if(typeof req.session.passport ==="undefined"){ 
  res.redirect('/admin/login');
  }
  else
  {
    if(typeof req.session.passport.user ==="undefined"){
        res.redirect('/admin/login');
    }
    Chuyendi.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/admin-showtablechuyendi');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  }
  
};

adminController.gettablehoadon = function(req, res) {
  if(typeof req.session.passport ==="undefined"){ 
  res.redirect('/admin/login');
  }
  else
  {
    if(typeof req.session.passport.user ==="undefined"){
        res.redirect('/admin/login');
    }
    Hoadon.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/admin-showtablehoadon');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  }
  
};

adminController.gettablehoadonajax = function(req, res) {
    Hoadon.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/admin-tablehoadon');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  
};

adminController.gettablehoadonajax2 = function(req, res) {
    Tour.find()
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        res.render('admin/admin-tabletour');
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  
};


adminController.gettablehoadonthongke = function(req, res) {
    var thang="";
    if(typeof req.body.thang !=="undefined"){
        if(req.body.thang===""){
          thang ="";
        }
        else if(req.body.thang<10)
        {
          thang = "0"+req.body.thang;
        }
        else
        {
          thang = req.body.thang;
        }
    }
    console.log(thang);
    var matour="";
    if(typeof req.body.matour !=="undefined"){
          matour = req.body.matour;
    }
    
    Hoadon.find({"idchuyen" : {$regex : ".*"+matour+".*"+thang+"2018.*",$options: "i" }})
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        if((typeof req.body.thang ==="undefined")&& (typeof req.body.matour ==="undefined")){
        res.render('admin/admin-showtablehoadonthongke');
        }else{
            res.render('admin/admin-tablehoadonthongke');
        }
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  
};


adminController.gettablechuyendithongke = function(req, res) {
    var thang="";
    if(typeof req.body.thang !=="undefined"){
        if(req.body.thang===""){
          thang ="";
        }
        else if(req.body.thang<10)
        {
          thang = "0"+req.body.thang;
        }
        else
        {
          thang = req.body.thang;
        }
    }
    console.log(thang);
    var matour="";
    if(typeof req.body.matour !=="undefined"){
          matour = req.body.matour;
    }
    
    Chuyendi.find({"idchuyen" : {$regex : ".*"+matour+".*"+thang+"2018.*",$options: "i" }})
    .then(nn => {
        res.locals.nn=nn;
        console.log('day là nn');
        console.log(nn);
        if((typeof req.body.thang ==="undefined")&& (typeof req.body.matour ==="undefined")){
        res.render('admin/admin-showtablechuyendithongke');
        }else{
            res.render('admin/admin-tablechuyendithongke');
        }
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  
};


adminController.getedittour = function(req, res) {
    Tour.findOne({matour:req.params.matour})
    .then(nn => {
        console.log('day la 3 nnnnn ');
        console.log(nn);
        res.locals.detail=nn;
        res.render('admin/admin-showedittour');
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
  
};

//route edit tour
adminController.edittour = function(req, res) {  

  if(typeof req.files.picture1 !=='undefined'){
  let sampleFile1 = req.files.picture1;
  var path1='uploads/tours/'+req.files.picture1.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile1.mv('D:/Work/doan/public/'+path1, function(err) {
    if (err)
      return res.status(500).send(err);     
  });
  }

  if(typeof req.files.picture2 !=='undefined'){
    let sampleFile2 = req.files.picture2;
  var path2='uploads/tours/'+req.files.picture2.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile2.mv('D:/Work/doan/public/'+path2, function(err) {
    if (err)
      return res.status(500).send(err); 
  });
  }
  
  if(typeof req.files.picture3 !=='undefined'){
    let sampleFile3 = req.files.picture3;
  var path3='uploads/tours/'+req.files.picture3.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile3.mv('D:/Work/doan/public/'+path3, function(err) {
    if (err)
      return res.status(500).send(err); 
  });
  }
  
  if(typeof req.files.picture4 !=='undefined'){
  let sampleFile4 = req.files.picture4;
  var path4='uploads/tours/'+req.files.picture4.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile4.mv('D:/Work/doan/public/'+path4, function(err) {
    if (err)
      return res.status(500).send(err); 
  });
  }

  if(typeof req.files.picture5 !=='undefined'){
  let sampleFile5 = req.files.picture5;
  var path5='uploads/tours/'+req.files.picture5.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile5.mv('D:/Work/doan/public/'+path5, function(err) {
    if (err)
      return res.status(500).send(err); 
  });
  }

    Tour.findOneAndUpdate({matour:req.params.matour}, {
        matour:req.body.matour,
        tentour:req.body.tentour,
        hanhtrinh:req.body.hanhtrinh,
        noixp:req.body.noixp,
        ngay:req.body.ngay,
        mota:req.body.mota,
        hinhanh1:req.body.hinhanh1,
        hinhanh2:req.body.hinhanh2,
        hinhanh3:req.body.hinhanh3,
        hinhanh4:req.body.hinhanh4,
        hinhanh5:req.body.hinhanh5,
        dongia:req.body.dongia,
        ngay1:req.body.ngay1,
        ngay2:req.body.ngay2,
        ngay3:req.body.ngay3,
        ngay4:req.body.ngay4,
        ngay5:req.body.ngay5,
        ngay6:req.body.ngay6,
        ngay7:req.body.ngay7,
        mucdo:req.body.mucdo,
        loai:req.body.loai
    })
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.matour
            });
        }
        res.redirect('http://localhost:3002/admin/danhsachtour');
        console.log("Update thanh cong");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.matour
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.matour
        });
    });
    
};

module.exports = adminController;