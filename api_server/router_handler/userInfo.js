const db = require('../db/index.js')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = 'SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length != 1) return res.cc('获取用户信息失败')

    res.send({
      status: 0,
      msg: '获取用户基本信息成功!',
      data: results[0]
    })
  })
}

exports.updateUserInfo = (req, res) => {
  const sql = 'UPDATE ev_users SET ? WHERE id=?'
  db.query(sql, [req.body, req.user.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.changedRows != 1) return res.cc('修改用户基本信息失败')

    res.cc('修改用户基本信息成功!', 0)
  })
}

// 重置密码
exports.updatePassword = (req, res) => {
  const sql = 'SELECT * FROM ev_users WHERE id = ?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length != 1) return res.cc('用户不存在');
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('旧密码错误')

    const sql = 'UPDATE ev_USER SET password=? WHERE id='
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.user.id], () => {
      if (err) return res.cc(err)
      if (results.changedRows != 1) return res.cc('更新密码失败')
      return res.cc('更新密码成功', 0)
    })
  })
}

exports.updateAvatar = function (req, res) {
  const sql = 'UPDATE ev_USER SET user_pic=? WHERE id=?'
  db.query(sql, [req.body.avvatar, req.user.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.changedRows != 1) return res.cc('更新用户头像失败')
    return res.cc('更新头像成功', 0)
  })
}