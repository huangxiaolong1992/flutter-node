import express from 'express';
const dynamic  = require("../controller/dynamic");
const router:any = express.Router()
const {checkCreateDynamicParam, checkgetDynamicListParam, checkgetDynamicDetailParam} = require('../config/validator-params');


//发表动态
router.post(`/createDynamic`, checkCreateDynamicParam() , dynamic.createDynamic)

//分页拉取动态列表
router.get(`/getDynamicList`, checkgetDynamicListParam(), dynamic.getDynamicList)

//分页拉取动态列表
router.get(`/getDynamicDetail`, checkgetDynamicDetailParam(), dynamic.getDynamicDetail)


module.exports  = router