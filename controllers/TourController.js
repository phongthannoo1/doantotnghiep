var mongoose = require("mongoose");
var passport = require("passport");
var Tour = require("../models/Tour");
var Chuyendi = require("../models/Chuyendi");
var Hoadon = require("../models/Hoadon");

var tourController = {};

tourController.getinserttour = function(req, res) {
  res.render("admin/admin-showuptour");
};

//insert tour include image
tourController.inserttour = function(req, res) {	
	if (!req.files)
    return res.status(400).send('No files were uploaded.');
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
  const note = new Tour({
        matour:req.body.matour,
        tentour:req.body.tentour,
        hanhtrinh:req.body.hanhtrinh,
        noixp:req.body.noixp,
        ngay:req.body.ngay,
        mota:req.body.mota,
        hinhanh1:path1,
        hinhanh2:path2,
        hinhanh3:path3,
        hinhanh4:path4,
        hinhanh5:path5,
        dongia:req.body.dongia,
        ngay1:req.body.ngay1,
        ngay2:req.body.ngay2,
        ngay3:req.body.ngay3,
        ngay4:req.body.ngay4,
        ngay5:req.body.ngay5,
        ngay6:req.body.ngay6,
        ngay7:req.body.ngay7,
        mucdo:req.body.mucdo,
        loai:req.body.loai,
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.locals.message = "Thêm Tour thành công";
        console.log(data);
        res.render('admin/adminpage');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
    
};

//route get all tour for index
tourController.getall = function(req, res) {
  Tour.find().sort({'mucdo': 1}).limit(4)
    .then(hot => {
      Tour.find({'loai':{$regex : ".*tn.*"}}).sort({'mucdo': -1}).limit(4)
    .then(tn => {
      Tour.find({'loai':{$regex : ".*nn.*"}}).sort({'mucdo': 1}).limit(4)
    .then(nn => {
        res.locals.hot=hot;
        res.locals.tn=tn;
        res.locals.nn=nn;
        res.render('index');
  }) })  }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//route get one tour for detail
tourController.getone = function(req, res) {
  var tour;
    Tour.findOne({tentour:req.params.qtentour})
    .then(nn => {
        console.log('day la 3 nnnnn ');
        console.log(nn);
        tour=nn;
        Chuyendi.find({matour:nn.matour})
    .then(chuyendi => {
        console.log('day la 3 nnnnn ');
        console.log(nn);
        res.locals.detail=tour;
        res.locals.chuyendi=chuyendi;
        res.render('showtour');
     });
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//route get all tour trong nuoc for /danhsachtn
tourController.gethot = function(req, res) {
    Tour.find({loai:'tn'}).limit(16)
    .then(tn => {
        res.locals.detail=tn;
        res.render('showtourhot');
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


//route get all tour trong nuoc for /danhsachtn
tourController.gettrongnuoc = function(req, res) {
  var dn;
  var hue;
  var hn;
    Tour.find({"tentour" : {$regex : ".*Đà Nẵng.*"}}).limit(8)
    .then(tn => {
        dn=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"tentour" : {$regex : ".*Huế.*"}}).limit(8)
    .then(tn => {
        hue=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"tentour" : {$regex : ".*Hà Nội.*"}}).limit(8)
    .then(tn => {
        hn=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"loai" : {$regex : ".*tn.*",$options: "i" }}).limit(8)
    .then(tn => {
        res.locals.detail=tn;        
        res.locals.hn=hn;
        res.locals.dn=dn;
        res.locals.hue=hue;
        res.render('showtourtrongnuoc');
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//route get all tour nuoc ngoai for /danhsachnuocngoai
tourController.getnuocngoai = function(req, res) {
  var phap;
  var anh;
  var my;
    Tour.find({"tentour" : {$regex : ".*Pháp.*"}}).limit(8)
    .then(tn => {
        phap=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"tentour" : {$regex : ".*Anh.*"}}).limit(8)
    .then(tn => {
        anh=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"tentour" : {$regex : ".*Mỹ.*"}}).limit(8)
    .then(tn => {
        my=tn;
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    Tour.find({"loai" : {$regex : ".*nn.*",$options: "i" }}).limit(8)
    .then(tn => {
        res.locals.detail=tn;        
        res.locals.phap=phap;
        res.locals.anh=anh;
        res.locals.my=my;
        res.render('showtournuocngoai');
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


//".*"+req.body.timkiem+".*"/i
tourController.timkiem = function(req, res) {
  var timkiem="";
    if(typeof req.body.timkiem !=="undefined"){
          timkiem =req.body.timkiem;        
    }else if (typeof req.params.timkiem !=="undefined"){
        timkiem = req.params.timkiem;
    }
    Tour.find({"tentour" : {$regex : ".*"+timkiem+".*",$options: "i" }}).limit(16)
    .then(tn => {
      console.log('day la tn');
      console.log(tn);
        res.locals.detail=tn;
        res.render('showtourtimkiem');  
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// get dattour
tourController.getdattour = function(req, res) {
    res.render('showdattour');
};

//post dattour
tourController.dattour = function(req, res) {
  var tour;
  var chuyendi;

  Chuyendi.findOne({idchuyen:req.params.idchuyen})
    .then(nn => {        
        chuyendi=nn;
         Tour.findOne({matour:chuyendi.matour})
    .then(tn => {
      console.log('day la tour ');
        console.log(tour);
      console.log('day la chuyendi');
      console.log(tn);
        res.locals.tour=tn;
        res.locals.chuyendi=chuyendi;
        res.render('showdattour');  
     });
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
    
    /*Chuyendi.findOne({matour:req.params.matour})
    .then(tn => {
      console.log('day la tour ');
        console.log(tour);
      console.log('day la chuyendi');
      console.log(tn);
        res.locals.tour=tour;
        res.locals.chuyendi=tn;
        res.render('showdattour');  
     }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });*/
};


//insert hoadon
tourController.inserthoadon = function(req, res) {  
  
  const note = new Hoadon({
        mahoadon: req.body.mahoadon,
        idchuyen: req.body.idchuyen,
        tenkh:req.body.hotenkhachchinh,
        soluongkhach:req.body.soluongkhach,
        danhsachkhach:{
          ten : req.body.hoten,
          ngaysinh : req.body.ngaysinh,
          gioitinh : req.body.gioitinh,
          diachi : req.body.diachi,
          loaikhach : req.body.loaikhach,
          quoctich : req.body.quoctich,
        },
        email: req.body.emailkhachchinh,
        didong: req.body.dienthoai,
        diachi: req.body.diachikhachchinh,
        ghichu: req.body.ghichu,
        thanhtien: req.body.tongtien
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.locals.message = "Thanh toán thành công";
        console.log(data);
        res.render('showdattourthanhcong');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

    Chuyendi.findOneAndUpdate({idchuyen:req.body.idchuyen}, {
        dadat: req.body.dadatkhach
    })
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.limitid
            });
        }
        console.log("Update thanh cong");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.limitid
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.limitid
        });
    });
    
};

module.exports = tourController;