const { exec, escape } = require("../db/mysql.js");
const { getPassword } = require("../utils/cryp.js");


module.exports.login = function (username, password) {
  username = escape(username);
  password = escape(password);

  // 生成加密密码
  password = getPassword(password);

  const sql = `SELECT username,realname FROM users WHERE username=${username} AND password='${password}'`;

  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
}
