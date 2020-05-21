import express from 'express';
const users  = require("../controller/users");
const router:any = express.Router()
const {checkUsersParam} = require('../config/validator-params');

//注册
router.post(`/register`,  checkUsersParam(), users.register)

//登录
router.post(`/login`, checkUsersParam(), users.login)



module.exports  = router