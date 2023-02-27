const mongoose = require('./tools/connect')
const StuModel = require('./models/student')


StuModel.findOne({}, function (err, doc) {
  if (!err) {
    console.log(doc)
  }
})
