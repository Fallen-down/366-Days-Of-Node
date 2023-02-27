const { Blog, User } = require('./model');

(async function () {
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    passWord: '123',
    nickName: '张三'
  })
  
  const lisi = await User.create({
    userName: 'lisi',
    passWord: '123',
    nickName: '李四'
  })

  const first_blog = await Blog.create({
    title: 'zhangsan vlog',
    content: '不知道为什么',
    userId: zhangsan.dataValues.id
  })
})()