"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
exports.hashPassword = (password) => {
  return bcrypt_1.hash(password, 4);
};
