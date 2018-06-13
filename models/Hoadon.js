var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HoadonSchema = new Schema({
    mahoadon: String,
    idchuyen: String,
    tenkh:String,
    soluongkhach:Number,
    danhsachkhach: {
                        ten : [String],
                        ngaysinh : [String],
                        gioitinh : [String],
                        diachi : [String],
                        loaikhach : [String],
                        quoctich : [String]
                         },
    email: String,
    didong: String,
    diachi: String,
    ghichu: String,
    thanhtien: Number
}, { timestamps: true });

module.exports = mongoose.model('Hoadon', HoadonSchema);