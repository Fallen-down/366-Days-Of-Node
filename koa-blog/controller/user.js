const { exec, escape } = require("../db/mysql.js");
const { getPassword } = require("../utils/cryp.js");


module.exports.login = async function (username, password) {
  // 字符转义
  username = escape(username);
  password = escape(password);

  // 生成加密密码
  password = getPassword(password);

  const sql = `SELECT username,realname FROM users WHERE username=${username} AND password='${password}'`;

  const rows = await exec(sql)
  return rows[0] || {};
}
