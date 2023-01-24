const db = require('../db/index.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config.js')


exports.regUser = (req, res) => {
  //  获取客户端提交到服务器的用户信息
  const userInfo = req.body;
  // 定义 SQL 语句，查询用户是否被占用
  const sqlStr = 'SELECT  * FROM ev_users WHERE username=?'
  db.query(sqlStr, userInfo.username, (err, results) => {
    // 判断用户名是否被占用
    if (results.length > 0) {
      res.cc(
        '用户名被占用'
      )
    }
  })
  // 加密
  userInfo.password = bcrypt.hashSync(userInfo.password, 10)
  res.send({

  })
}

exports.login = (req, res) => {
  const userInfo = req.body;
  const sql = 'SELECT * FROM ev_users WHERE username=?'
  db.query(sql, userInfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败')
    // 对比密码
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败')
    // 生成 token 的字符串
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = `Bearer ${jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })}`

    res.send({
      status: 0,
      msg: '登录成功',
      token: tokenStr
    })
  })
}