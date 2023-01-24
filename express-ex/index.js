const express = require("express");
const path = require("path");
const birds = require("./router/birds.js");
const bodyParser = require('./body-parser.js')
const cors = require('cors')



const app = express();
const port = 3000;

// 导入用于生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const expressJWT = require('express-jwt');

const secretKey = 'secret key'

// expressJWT({secret: secretKey}) 用来解析 token 
// .unless({path: [/^\/api\//]}) 指定哪些接口不需要访问权限
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))

app.post('/api/login', (req, res) => {
  res.send({
    status: 200,
    msg: '登录成功',
    // 用户信息，密钥，配置信息
    token: jwt.sign({
      username: userInfo.username
    }, secretKey, { expiresIn: '30s' })

  })
})



app.use(cors())



// 全局中间件
app.use(function (req, res, next) {
  console.log(Date.now());
  next();
});

function checkVipInfo(req, res, next) {
  console.log("校验用户 vip 信息");
  next();
}


app.use(bodyParser);

// 静态文件托管
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/birds", birds);

app.listen(port, () => {
  console.log(`express listening on ${port}`);
});

// 错误中间件 必须注册在所有路由之后
app.use(function (err, req, res, next) {
  console.log("发生了错误:" + err.message);
  res.send("Error!" + err.message);
});
