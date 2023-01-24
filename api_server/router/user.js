var express = require('express');
var router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user');

const expressJoi = require('@escook/express-joi')
// 导入验证数据的中间件
const { reg_login_schema } = require('../schema/user.js')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser);
// 登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login);

module.exports = router;