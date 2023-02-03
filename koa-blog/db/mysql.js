const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db.js");

// 创建链接对象
const connection = mysql.createConnection(MYSQL_CONF);

// 开始链接
connection.connect();

// 统一执行 sql 的函数
exports.exec = function (sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

exports.escape = mysql.escape;
