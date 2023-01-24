const express = require('express');
const router = express.Router();

const expressJoi = require('@escook/express-joi')
const { update_user_info_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

const userInfo_handler = require('../router_handler/userInfo');

// 注册新用户
router.get('/userInfo', userInfo_handler.getUserInfo)
router.post('/userInfo', expressJoi(update_user_info_schema), userInfo_handler.updateUserInfo)
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword)
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo_handler.updateAvatar)


module.exports = router;