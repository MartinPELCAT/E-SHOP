"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
exports.clearSessionCookie = (req, res, next) => {
  let token = req.signedCookies._UID;
  if (token) {
    res.clearCookie("_UID");
  }
  next();
};
exports.setSessionCookie = (res, user, keepMeLogged) => {
  let cookieOptions = { httpOnly: true, signed: true };
  if (keepMeLogged) {
    cookieOptions.expires = date_fns_1.addYears(new Date(), 10);
  }
  res.cookie("_UID", user.token, cookieOptions);
};
