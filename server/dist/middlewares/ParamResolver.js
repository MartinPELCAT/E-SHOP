"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Framework_1 = require("../decorators/Framework");
const User_1 = require("../models/User");
exports.useUserParamResolver = () => {
  Framework_1.router.param("user", function (_req, res, next, id) {
    User_1.User.findOne({ _id: id })
      .then((user) => {
        if (user) {
          res.locals.userParam = user;
        } else {
          res
            .status(404)
            .send({ errors: [{ message: `User ${id} does not exist` }] });
        }
        return next();
      })
      .catch(() => {
        res
          .status(500)
          .send({ errors: [{ message: `Internal server error` }] });
      });
  });
};
