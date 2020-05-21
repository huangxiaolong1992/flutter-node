const dbHelper  = require('../db/dbHelper') ;
const xss = require('node-xss').clean;

const hints = require('../config/hints');
const {checkParam} = require('../config/validator-params');
const getToken = require('../config/getToken');

import crypto from 'crypto';


let Dynamic = dbHelper.getModel('dynamic');

//创建动态
function createDynamic(req, res, next):void {
    const params =  xss(req.body);
 
    checkParam(req,res);
    
    if(!getToken(req, res).name){
        return;
    }

    Dynamic.create({
        ...params,
        thumbupNum: 0,
        commentNum: 0,
        time: new Date().getTime()
    }, (error,doc) =>{
        if(error){
            res.json(
                hints.CREATEFAIL()
            )
        }else{
            res.json(
                hints.SUCCESS({
                    data : doc,
                    msg  : "创建成功"
                })
            )
        }        
    })
}

//拉取动态
function getDynamicList(req, res, next):void{
    const rows = Math.floor(req.query.rows) || 10;
    const index = Math.floor(req.query.index) || 1;
    const username = req.query.username;

    let pagesize, data;

    if(!getToken(req, res).name){
        return;
    }

    const condition =  {
        $or:[ 
               {visibleUsers: [username]},
               {visibleUsers: []}
            ] 
    };
       
    Dynamic.count( condition ,(err,doc)=>{
        pagesize = doc;
    })
 
    Dynamic.find( condition ,(err,doc)=>{   

        if(err){
            res.json(
                hints.FINDFAIL({
                    data: err
                })
            )
        }else{
            let totalPage = Math.ceil(pagesize / rows);  //总共多少页

            const result = hints.SUCCESS({
                data : {
                    pagesize, //总条数
                    totalPage,
                    rows,//每页显示多少条
                    index,//当前页数
                    result:doc
                },
                msg  : "查询成功"
            })

            res.json(
                result
            )
        }
    }).sort({"_id": -1}).skip((index - 1) * rows).limit(rows);
}

//动态详情
function getDynamicDetail(req, res, next):void{
    const _id = req.query.id; 

    checkParam(req,res);

    if(!getToken(req, res).name){
        return;
    }

    Dynamic.find({_id} ,(err,doc)=>{   
        if(err){
            res.json(
                hints.FINDFAIL({
                    data: err
                })
            )
        }else{
            res.json(
                hints.SUCCESS({
                    data : doc,
                    msg  : "查询成功"
                })
            )
        }
    });
}

module.exports = {
    createDynamic,
    getDynamicList,
    getDynamicDetail
}