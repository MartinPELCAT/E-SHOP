import * as express from "express";
import { Application } from "express";
import * as chalk from "chalk";
import * as path from "path";
import { connectDatabase } from "./config/database";
import { router } from "../src/decorators/ApiFramework";
import * as fs from "fs";

export default class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.loadControllers();
    // this.app.use(
    //   express.static(path.join(__dirname, "/../../", "client", "build"))
    // );
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private loadControllers() {
    let controllerPath = path.join(__dirname, "controllers");
    fs.readdirSync(controllerPath).forEach(function (file) {
      require("./controllers/" + file);
    });
    this.app.use("/api", router)
  }

  public listen() {
    // this.app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '/../../', 'client', 'build', 'index.html'));
    // });
    this.app.listen(this.port, () => {
      console.log("---------------------------------------------");
      console.log(
        chalk.italic(`App listening on the http://localhost:${this.port}`)
      );
      connectDatabase();
    });
  }
}
