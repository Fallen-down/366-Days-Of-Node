const router = require('koa-router')()
const {
  getList,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck")

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";

  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData)
})


module.exports = router