import { exec, escape } from "../db/mysql.js";
import { getPassword } from "../utils/cryp.js";

export function login(username, password) {
  username = escape(username);
  password = escape(password);
  // 生成加密密码
  password = getPassword(password);

  const sql = `SELECT username,realname FROM users WHERE username=${username} AND password='${password}'`;

  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
}
