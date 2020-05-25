import express from 'express';
const upload  = require("../controller/upload");
const router:any = express.Router()
const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, path.resolve('./') +'/public/upload')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  Date.now() + file.originalname);
     }
}); 
 
 
var uploadFile = multer({
    storage: storage
});
//上传图片
router.post(`/`,  uploadFile.single("file"), upload.upload)



module.exports  = router