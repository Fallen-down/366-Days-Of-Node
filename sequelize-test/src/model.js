const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize')

const User = sequelize.define('user', {
  // todo 定义模型属性
  // ? id 会自动创建，并设为主键、自增
  // ? 自动创建 createdAt 和 updateAt
  userName: {
    type: DataTypes.STRING, // * varchar(255)
    // 允许为空 
    allowNull: false,
    // defaultValue: 'green'
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickName: {
    type: DataTypes.STRING,
    comment: '昵称'
  }
})

// * 创建 Blog 模型
const Blog = sequelize.define('blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})


// * 外键关联 
// ? 一对多
User.hasMany(Blog, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: "userId",
});
Blog.belongsTo(User);

module.exports = {
  User,
  Blog
}