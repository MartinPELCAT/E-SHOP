"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const UserDAO_1 = require("../../dao/UserDAO");
const ErrorResponse_1 = require("../../errors/ErrorResponse");
const bcrypt_1 = require("bcrypt");
class AuthenticationServiceImpl {
  constructor() {
    this.userDAO = UserDAO_1.default;
  }
  generateNewToken(user) {
    return this.userDAO.generateNewToken(user);
  }
  findUserOrFail(condition, password) {
    return __awaiter(this, void 0, void 0, function* () {
      let user = yield this.userDAO.findOne(condition);
      if (user && user.password) {
        let passwordMatch = yield bcrypt_1.compare(password, user.password);
        if (passwordMatch) {
          return user;
        } else {
          throw new ErrorResponse_1.ErrorResponse("Password dont match");
        }
      } else {
        throw new ErrorResponse_1.ErrorResponse("User not found");
      }
    });
  }
}
exports.default = new AuthenticationServiceImpl();
