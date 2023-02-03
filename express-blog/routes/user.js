var express = require("express");
var router = express.Router();

const { login } = require("../controller/user.js");
const { SuccessModel, ErrorModel } = require("../model/resModel.js");

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password);
  return result.then((data) => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username;
      req.session.realname = data.realname;
      // 同步到 redis
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel())
    }
  });
});

module.exports = router;
