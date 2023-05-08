var express = require("express");

const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/account");
});

router.get("/account", checkLoginMiddleware, function (req, res, next) {
  AccountModel.find()
    .sort({ time: -1, account: -1 })
    .then((accounts) => {
      console.log(accounts);
      res.render("list", { accounts, moment });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode(500).send("获取失败，请重试～");
    });
});

router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});

router.post("/account/create", checkLoginMiddleware, function (req, res, next) {
  AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() })
    .then((result) => {
      console.log(result);
      res.render("reminder", { msg: "添加成功啦！", url: "/account" });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode(500).send("输入失败，请重试～");
    });
});

router.get("/account/:id", checkLoginMiddleware, function (req, res, next) {
  const id = req.params.id;
  AccountModel.deleteOne({ _id: id })
    .then((result) => {
      console.log(result);
      res.render("reminder", { msg: "删除成功啦！", url: "/account" });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode(500).send("删除失败，请重试～");
    });
});

module.exports = router;
