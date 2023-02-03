var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require('fs')
const session = require('express-session');
const RedisStore = require("connect-redis")(session)


// 路由
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

// 查看引擎设置
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// 线上 用 combined
// 日志
app.use(logger("dev", {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
}));

// 解析处理 content-type 为 json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie 解析
app.use(cookieParser());
// 静态文件
// app.use(express.static(path.join(__dirname, "public")));

const redisClient = require('./db/redis')


// 配置 session 中间件
app.use(session({
  secret: 'secret', // secret 属性的值可以为任意字符串
  name: 'sessionId',
  resave: false, // 固定写法
  saveUninitialized: true, // 固定写法
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new RedisStore({ client: redisClient })
}))

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
