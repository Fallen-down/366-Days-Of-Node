// 加密
const crypto = require("node:crypto");

// 密钥
const SECRET_KEY = "wojiweiwang";

function md5(content) {
  let md5 = crypto.createHash("md5");
  // hex 16 进制
  return md5.update(content).digest("hex");
}

// 加密函数
module.exports.getPassword = function (password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}
