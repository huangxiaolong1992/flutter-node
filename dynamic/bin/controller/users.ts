const dbHelper  = require('../db/dbHelper') ;
const xss = require('node-xss').clean;
const jwt= require('jsonwebtoken');
const expressJwt = require('express-jwt');
const hints = require('../config/hints');
const {checkParam} = require('../config/validator-params');

import crypto from 'crypto';

let User = dbHelper.getModel('user');

class UsersClass { 
    public secret: string;
    
    constructor(){
        
        this.secret = 'dynamic'; //定义签名
    }

    mdsPassword(password:string){
        let md5 = crypto.createHash('md5')
        let md5Pwd = md5.update(password).digest('hex')
        return md5Pwd;
    }

    register(req, res, next):void{
        	 
        let  {username, password} = xss(req.body);
      
        checkParam(req,res);

        User.findOne({username:username},(err,doc)=>{
			 
            if(err){
                res.json(
                    hints.FINDFAIL({
                        data: err
                    })
                )

            }else if(doc){  
                res.json(hints.REGISTER_UNAVAILABLE);

            }else{
                User.create({
                    username:username,
                    password: new UsersClass().mdsPassword(password)
                        
                },(error,doc) =>{
                    res.json(
                        hints.SUCCESS({
                            data: {
                                username: username
                            },
                            msg : '注册成功'
                        })
                    );
                })
                
            }
        })
    }

    login(req, res, next):void{
       
        let  {username, password} = xss(req.body);

        checkParam(req,res);
      
        User.findOne({username:username}, (err,doc) =>{
           
            if(err){
                res.json(
                    hints.FINDFAIL({
                        data: err
                    })
                )
            }else if(!doc){
              
                res.json(hints.LOGIN_USER_NOT_EXIST);

            }else{
                
                if(new UsersClass().mdsPassword(password) != doc.password){
                    res.json(
                        hints.LOGIN_PASSWORD_WRONG
                    );
                }else{ 
                //生成token
                    const token:String = jwt.sign({
                        name: username
                    }, new UsersClass().secret, {
                        expiresIn:  60000 //秒到期时间
                    });

                    res.json(
                        hints.SUCCESS({
                            data : {
                                username: username,
                                token : token
                            },
                            msg : "登录成功"
                        }
                    ));
                }
            }
       })

    }
} 

module.exports = {
    register: new UsersClass().register,
    login: new UsersClass().login
}