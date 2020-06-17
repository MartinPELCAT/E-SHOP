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
const BcryptUtils_1 = require("../../utils/BcryptUtils");
const ErrorResponse_1 = require("../../errors/ErrorResponse");
class UserServiceImpl {
  constructor() {
    this.userDao = UserDAO_1.default;
  }
  createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
      console.log("create user");
      const hashedPassword = yield BcryptUtils_1.hashPassword(user.password);
      user.password = hashedPassword;
      const user_1 = user;
      return this.userDao.insertUser(user_1);
    });
  }
  findOneOrFail(condition) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = yield this.userDao.findOne(condition);
      if (user) {
        user.password = undefined;
        return user;
      } else {
        throw new ErrorResponse_1.ErrorResponse("User not found");
      }
    });
  }
}
exports.default = new UserServiceImpl();
