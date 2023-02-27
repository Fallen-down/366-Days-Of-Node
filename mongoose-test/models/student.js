/**
 * 用来定义 Student 的模型
 */
const mongoose = require('mongoose');

// 创建 Schema (模式) 对象
const Schema = mongoose.Schema;

// 创建 Schema 
var stuschema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: Number,
    // 默认值
    default: 0
  },
  address: String,
})

// 创建 model
const StuModel = mongoose.model('student', stuschema);

module.exports = StuModel