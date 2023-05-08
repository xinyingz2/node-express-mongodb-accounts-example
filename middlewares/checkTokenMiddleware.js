const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
module.exports = (req, res, next) => {
  //get token
  const token = req.get("token"); //token:xxxx in headers
  //verify token
  if (!token) {
    return res.json({
      code: "2003",
      msg: "token is missing...",
      data: null,
    });
  }

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token verification failed",
        data: null,
      });
    }
    req.user = data;
    next();
  });
};
