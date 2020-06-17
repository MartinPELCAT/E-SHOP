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
const Framework_1 = require("../decorators/Framework");
let TestController = class TestController {
  get(req, res) {
    this.userService
      .findOneOrFail({ _id: req.params.userid })
      .then((user) => res.send(user))
      .catch((error) => {
        return res.send(error.toJson());
      });
  }
  post(req, res) {
    console.log(req.body);
    return res.send("YO post");
  }
  delete(_req, res) {
    return res.send("YO delete");
  }
  put(_req, res) {
    return res.send("YO put");
  }
};
__decorate(
  [Framework_1.Autowired, __metadata("design:type", Object)],
  TestController.prototype,
  "userService",
  void 0
);
__decorate(
  [
    Framework_1.Get("/get/:userid"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  TestController.prototype,
  "get",
  null
);
__decorate(
  [
    Framework_1.Post("/post"),
    Framework_1.Authenticated({ roles: ["postRole"] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  TestController.prototype,
  "post",
  null
);
__decorate(
  [
    Framework_1.Delete("/delete"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  TestController.prototype,
  "delete",
  null
);
__decorate(
  [
    Framework_1.Put("/put"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0),
  ],
  TestController.prototype,
  "put",
  null
);
TestController = __decorate([Framework_1.Controller("/test")], TestController);
exports.default = TestController;
