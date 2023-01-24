const express = require('express');
const router = express.Router();

// 导入用户路由处理函数模块
const articleHandler = require('../router_handler/article');

// 发布文章的路由
router.post('/add', articleHandler.addArticle)

module.exports = router;