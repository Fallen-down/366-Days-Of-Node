# 366-Days-Of-Node

学习 node 366 天

## 第 1 天

### [黑马程序员 Node.js 全套入门教程](https://www.bilibili.com/video/BV1a34y167AZ/)

### [【尚硅谷】最经典 Node.JS 全套完整版教程(快速入门 nodejs)](https://www.bilibili.com/video/BV1bs411E7pD/?vd_source=41631d99c1a65feeb21c562327a94eb4)

示例代码

- fs 模块
- fs-ex: 拆分 html 中的 js 和 css
- http-ex: 静态文件托管
- module-ex: module
- express-ex: express
- api_server: express 接口实现
- module-ex/itheima-tools-sdh 发布包

## 第 2 天

### [Node.js+Express+Koa2 开发 Web Server 博客](https://coding.imooc.com/class/320.html)

### [尚硅谷 MongoDB 入门基础教程](https://www.bilibili.com/video/BV18s411E78K/)

代码示例

- node-blog
- express-blog
- koa-blog
- pm2-test
- mongoose-test mongoose 的基础操作

## 第 3 天

### [Node.js-Koa2 框架生态实战－从零模拟新浪微博](https://coding.imooc.com/class/388.html)













post 处理

```js
// 解析 JSON 格式数据
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));
```

登录 - 密码加密/校对
日志 - 开发日志、生产日志、自定义日志
nginx - 静态资源服务、反向代理、跨域
接口权限 - token 解析
参数校验
暂时用黑马封装的 mysql
res.json

质量
去毛- eslint、.eslintignore
格式化工具
typescript
持续集成

安全
开启 https
mysql.escape 转义 —— 防止 sql 注入
xss 库 —— 防止 xss 攻击
helmet 中间件
csurf 防范跨域请求伪造（CSRF）攻击。

性能
http2
nginx 请求缓存、Gzip 压缩
compress 压缩响应数据(compress 之前的中间件只有 debugging 或 logging（它们不发送响应）)
