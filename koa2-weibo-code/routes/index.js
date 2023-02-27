const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    des: '学！赶紧学',
    isSelf: false,
    blogList: [
      { title: '博客标题' },
      { title: '骚客标题' }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    userName
  }
});

router.post('/login', async (ctx, next) => {
  const { userName, passWord } = ctx.request.body
  ctx.body = {
    userName,
    passWord
  }
});

module.exports = router
