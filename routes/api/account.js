var express = require("express");

const moment = require("moment");
const AccountModel = require("../../models/AccountModel");
const checkTokenMiddleware = require("../../middlewares/checkTokenMiddleware");
var router = express.Router();

// get all accounts
router.get("/account", checkTokenMiddleware, function (req, res, next) {
  console.log(req.user); // get user info
  // token verification success
  AccountModel.find()
    .sort({ time: -1, account: -1 })
    .then((accounts) => {
      res.json({
        code: "0000",
        msg: "success",
        data: accounts,
      });
    })
    .catch(() => {
      res.json({
        code: "1001",
        msg: "fail",
        data: null,
      });
    });
});

// create new account
router.post("/account", checkTokenMiddleware, function (req, res, next) {
  AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() })
    .then((account) => {
      res.json({
        code: "0000",
        msg: "success",
        data: account,
      });
      //   console.log(result);
      //   res.render("reminder", { msg: "添加成功啦！", url: "/account" });
    })
    .catch(() => {
      res.json({
        code: "1002",
        msg: "fail",
        data: null,
      });
      //   console.log(err);
      //   res.statusCode(500).send("输入失败，请重试～");
    });
});
// get account by id
router.get("/account/:id", checkTokenMiddleware, function (req, res, next) {
  const id = req.params.id;
  AccountModel.findById(id)
    .then((account) => {
      res.json({
        code: "0000",
        msg: "success",
        data: account,
      });
    })
    .catch(() => {
      res.json({
        code: "1003",
        msg: "fail",
        data: null,
      });
    });
});

// delete account by id
router.delete("/account/:id", checkTokenMiddleware, function (req, res, next) {
  const id = req.params.id;
  AccountModel.deleteOne({ _id: id })
    .then(() => {
      res.json({
        code: "0000",
        msg: "success",
        data: {},
      });
    })
    .catch(() => {
      res.json({
        code: "1004",
        msg: "fail",
        data: null,
      });
    });
});

router.patch("/account/:id", checkTokenMiddleware, function (req, res, next) {
  const id = req.params.id;
  AccountModel.updateOne({ _id: id }, { ...req.body })
    .then(() => {
      AccountModel.findById(id)
        .then((account) => {
          res.json({
            code: "0000",
            msg: "success",
            data: account,
          });
        })
        .catch(() => {
          res.json({
            code: "1003",
            msg: "fail",
            data: null,
          });
        });
    })
    .catch(() => {
      res.json({
        code: "1005",
        msg: "fail",
        data: null,
      });
    });
});

module.exports = router;
