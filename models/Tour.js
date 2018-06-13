var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TourSchema = new Schema({
    matour: String,
    tentour: String,
    hanhtrinh:String,
    noixp:String,
    ngay: String,
    mota: String,
    hinhanh1: String,
    hinhanh2: String,
    hinhanh3: String,
    hinhanh4 :String,
    hinhanh5 :String,
    dongia: Number,
    ngay1: String,
    ngay2: String,
    ngay3: String,
    ngay4: String,
    ngay5: String,
    ngay6: String,
    ngay7: String,
    mucdo: String,
    loai: String,
    sochuyen:{
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Tour', TourSchema);