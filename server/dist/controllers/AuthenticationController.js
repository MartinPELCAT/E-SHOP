"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
const CookieUtils_1 = require("../utils/CookieUtils");
const RequestParameters_1 = require("../utils/RequestParameters");
const Framework_1 = require("../decorators/Framework");
let AuthenticationController = class AuthenticationController {
  login(req, res) {
    let { email, password, rememberMe } = req.body;
    this.authenticationService
      .findUserOrFail({ email }, password)
      .then((user) => {
        CookieUtils_1.setSessionCookie(res, user, rememberMe);
        return res.send({ user, message: "You are now logged", sucess: true });
      })
      .catch((err) => {
        return res.status(401).json({ message: err.message });
      });
  }
  register(req, res) {
    let { email, password, lastname, firstname, username } = req.body;
    let userParameters = { email, password, lastname, firstname, username };
    if (!RequestParameters_1.isValidBody(req.body, userParameters)) {
      // TODO: use yup or hapi joi instead
      return res.status(400).json({ message: "Unkonwn parameters" });
    }
    this.userService
      .createUser({ password, firstname, lastname, email, username })
      .then((createdUser) => {
        this.authenticationService
          .generateNewToken(createdUser)
          .then((user) => {
            return res.status(201).json(user);
          })
          .catch(() => {
            return res.status(500).json({ message: "Internal Error" });
          });
      })
      .catch(() => {
        return res.status(500).json({ message: "Internal Error" });
      });
  }
  isLogged(req, res) {
    let token = req.signedCookies._UID;
    if (!token) {
      return res.send({ isConnected: false });
    }
    this.userService
      .findOneOrFail({ token: token })
      .then((user) => {
        return res.send({ isConnected: true, user });
      })
      .catch(() => {
        return res.send({ isConnected: false });
      });
  }
  logout(_req, res) {
    return res.send({ sucess: true, message: "You are now logged out" });
  }
};
__decorate(
  [Framework_1.Autowired, __metadata("design:type", Object)],
  AuthenticationController.prototype,
  "authenticationService",
  void 0
);
__decorate(
  [Framework_1.Autowired, __metadata("design:type", Object)],
  AuthenticationController.prototype,
  "userService",
  void 0
);
__decorate(
  [
    Framework_1.Post("/login", [CookieUtils_1.clearSessionCookie]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  AuthenticationController.prototype,
  "login",
  null
);
__decorate(
  [
    Framework_1.Post("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  AuthenticationController.prototype,
  "register",
  null
);
__decorate(
  [
    Framework_1.Get("/checkCurrentUser"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  AuthenticationController.prototype,
  "isLogged",
  null
);
__decorate(
  [
    Framework_1.Post("/logout", [CookieUtils_1.clearSessionCookie]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  AuthenticationController.prototype,
  "logout",
  null
);
AuthenticationController = __decorate(
  [Framework_1.Controller("/auth")],
  AuthenticationController
);
exports.default = AuthenticationController;
