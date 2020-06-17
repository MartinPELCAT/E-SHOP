"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
exports.AuthMiddleware = (_data) => {
  return (req, res, next) => {
    let token = req.signedCookies._UID;
    if (!token) {
      return res.status(403).json({ message: "You are not logged" });
    } else {
      User_1.User.findOne({ token })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            return next();
          } else {
            return res.status(403).json({ message: "You are not logged" });
          }
        })
        .catch(() => {
          return res.status(403).json({ message: "You are not logged" });
        });
    }
  };
};
