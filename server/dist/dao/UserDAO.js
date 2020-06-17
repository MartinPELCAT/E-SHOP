"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const jsonwebtoken_1 = require("jsonwebtoken");
const KEYS_1 = require("../config/KEYS");
class UserDao {
  insertUser(parameters) {
    delete parameters._id;
    return User_1.User.create(parameters);
  }
  findOne(condition) {
    return User_1.User.findOne(condition).exec();
  }
  generateNewToken(user) {
    user.token = jsonwebtoken_1.sign(
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        photoPath: user.photoPath,
        signedOn: new Date(),
      },
      KEYS_1.JWT_SECRET
    );
    return user.save();
  }
}
exports.default = new UserDao();
