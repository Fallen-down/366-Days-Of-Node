const Koa = require('../lib/koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('X-Response-Time 开始')
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('X-Response-Time 结束')
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('Logging 开始')
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  console.log('Hello World')
  ctx.res.end('Hello World');
});

app.listen(3000);