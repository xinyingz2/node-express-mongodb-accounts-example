const { PORT, HOST, PROTOCOL, DB } = require("../config/config");
const mongoose = require("mongoose");
module.exports = (success, error) => {
  if (typeof error !== "function") {
    error = () => {
      console.log("connection error");
    };
  }

  mongoose.connect(`${PROTOCOL}://${HOST}:${PORT}/${DB}`);
  //   mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

  mongoose.connection.once("open", () => {
    success();
  });

  mongoose.connection.on("error", () => {
    error();
  });

  mongoose.connection.on("close", () => {
    console.log("connection closed");
  });
};
