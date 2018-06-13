var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChuyendiSchema = new Schema({
    idchuyen: String,
    matour: String,
    ngayxp:String,
    soluong:Number,
    dadat: Number,
    baogom: String,
    khongbaogom: String,
    luuy: String,
    dieukienhuytour: String
}, { timestamps: true });

module.exports = mongoose.model('Chuyendi', ChuyendiSchema);