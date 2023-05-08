var express = require("express");
const jwt = require("jsonwebtoken");
// const moment = require("moment");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const { SECRET } = require("../../config/config");
var router = express.Router();

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  UserModel.findOne({ username, password: md5(password) })
    .then((data) => {
      if (!data) {
        // null
        return res.json({
          code: "2002",
          msg: "账号或密码错误～",
          data: null,
        });
      }

      //   console.log(`${data}`);
      const { username, _id } = data;
      // create token
      //   jwt.sign({username: })
      const token = jwt.sign({ username, _id }, SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      // send token
      res.json({
        code: "0000",
        msg: "登录成功啦",
        data: token,
      });
      //写入 session (注意：需要写在res.render之前)
      //   req.session.username = data.username;
      //   req.session._id = data._id;
      //   res.render("reminder", { msg: "登录成功啦！", url: "/account" });
    })
    .catch(() => {
      res.json({
        code: "2001",
        msg: "登录失败，请稍后再试～～",
        data: null,
      });
    });
});

module.exports = router;
