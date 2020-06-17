"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chalk_1 = require("chalk");
const path_1 = require("path");
const database_1 = require("./config/database");
const Framework_1 = require("./decorators/Framework");
const fs_1 = require("fs");
const ParamResolver_1 = require("./middlewares/ParamResolver");
class App {
  constructor(appInit) {
    this.app = express();
    this.port = appInit.port;
    this.addApplicationParamResolver();
    this.middlewares(appInit.middleWares);
    this.loadControllers();
    // this.app.use(
    //   express.static(path.join(__dirname, "/../../", "client", "build"))
    // );
  }
  middlewares(middleWares) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }
  addApplicationParamResolver() {
    ParamResolver_1.useUserParamResolver();
  }
  loadControllers() {
    let controllerPath = path_1.join(__dirname, "controllers");
    fs_1.readdirSync(controllerPath).forEach(function (file) {
      require("./controllers/" + file);
    });
    this.app.use("/api", Framework_1.router);
  }
  listen() {
    // this.app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '/../../', 'client', 'build', 'index.html'));
    // });
    this.app.listen(this.port, () => {
      console.log("---------------------------------------------");
      console.log(
        chalk_1.italic(`App listening on the http://localhost:${this.port}`)
      );
      database_1.connectDatabase();
    });
  }
}
exports.default = App;
