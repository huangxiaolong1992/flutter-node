
const hints = require('../config/hints');

function getIPAdress(){  
	var interfaces = require('os').networkInterfaces();  
	for(var devName in interfaces){  
	    var iface = interfaces[devName];  
	    for(var i=0;i<iface.length;i++){  
			var alias = iface[i];  
			if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
				return alias.address;  
			}  
	    }  
	}  
}  

function uploadImg(req,res):void{
	const dir = 'upload/' + req.file.filename;
    if(dir){
        res.json(
            hints.SUCCESS({
                data: {
                    url :`http://${getIPAdress()}:8080/${dir}`
                },
                msg : '上传成功'
            })
        );
    }
}

module.exports = {
    upload: uploadImg
}