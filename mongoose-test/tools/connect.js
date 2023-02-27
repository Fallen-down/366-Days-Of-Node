const mongoose = require('mongoose');

// 开启查询筛选器的严格模式
mongoose.set('strictQuery', true);

// autoIndex  false 关闭索引构建 索引构建可能会导致性能下降
// 连接数据库
mongoose.connect('mongodb://localhost/test', { autoIndex: false });

mongoose.connection.once('open', function () {
  // console.log('数据库连接成功')
})


module.exports = mongoose