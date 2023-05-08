var express = require("express");

var router = express.Router();

const UserModel = require("../../models/UserModel");
const md5 = require("md5");

router.get("/reg", function (req, res, next) {
  res.render("auth/reg");
});

router.post("/reg", function (req, res, next) {
  //   const { username, password } = req.body;
  // 表单验证 TODO
  UserModel.create({ ...req.body, password: md5(req.body.password) })
    .then(() => {
      res.render("reminder", { msg: "注册成功啦！", url: "/login" });
    })
    .catch(() => {
      res.status(500).send("注册失败，请稍后再试～～");
    });
});

router.get("/login", function (req, res, next) {
  res.render("auth/login");
});

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  UserModel.findOne({ username, password: md5(password) })
    .then((data) => {
      if (!data) {
        return res.send("账号或密码错误～");
      }

      console.log(`${data}`);
      //写入 session (注意：需要写在res.render之前)
      req.session.username = data.username;
      req.session._id = data._id;
      res.render("reminder", { msg: "登录成功啦！", url: "/account" });
    })
    .catch(() => {
      res.status(500).send("登录失败，请稍后再试～～");
    });
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(() => {
    res.render("reminder", { msg: "退出成功啦！", url: "/login" });
  });
});

module.exports = router;
