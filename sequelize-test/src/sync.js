const sequelize = require('./sequelize');
require('./model')

sequelize.sync({ force: true }).then(() => {
  console.log('用户模型刚刚创建')
  // sequelize.close()
})