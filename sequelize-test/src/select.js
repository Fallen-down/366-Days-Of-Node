const { Blog, User } = require('./model');

/**
 * 描述
 * @date 2023-02-16
 * @param {any} asyncfunction(
 * @returns {any}
 */
(
  async function () {
    // const users = await User.findAll()
    // console.log(users.dataValues)

    // ? 查询一条记录
    // const zhangsan = await User.findOne({
    //   where: {
    //     userName: 'zhangsan'
    //   }
    // })

    // ? 查询特定的列
    const zhangsanName = await User.findOne({
      attributes: ['userName', 'nickName'],
      where: {
        userName: 'zhangsan'
      }
    })
    console.log(zhangsanName.dataValues)
  }
)();