// 导入 express 模块
const express = require('express')
// 导入 cors 中间件
const cors = require('cors')

const joi = require('joi')

// 解析token
const { expressjwt: expressJWT } = require('express-jwt');
const config = require('./config.js')

const usersRouter = require('./router/user.js')
const userInfoRouter = require('./router/userInfo.js')
const articleRouter = require('./router/article.js')


// 创建 express 的 服务器示例
const app = express()
const port = 3000;

// cors 注册为全局中间件
app.use(cors());

app.use(express.json());

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件 
app.use(express.urlencoded({ extended: false }));

// 封装 res.cc 函数
// 模板
app.use(function (req, res, next) {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next();
})

// 解析 token
// unless 不校验路径
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"], }).unless({ path: [/^\/api/] }))

app.use('/api', usersRouter)
app.use('/my', userInfoRouter)
app.use('/my/article', articleRouter)


app.use(function (err, req, res, next) {
  console.log("发生了错误:" + err.message);
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }

  // token 解析失败导致的错误
  if (err.name === 'UnauthorizedError') {
    return res.cc('无效的 token', 401)
  }
});



app.listen(port)