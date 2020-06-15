import * as express from "express";
import { Application } from "express";
import { italic } from "chalk";
import { join } from "path";
import { connectDatabase } from "./config/database";
import { router } from "./decorators/Framework";
import { readdirSync } from "fs";

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
    let controllerPath = join(__dirname, "controllers");
    readdirSync(controllerPath).forEach(function (file) {
      require("./controllers/" + file);
    });
    this.app.use("/api", router);
  }

  public listen() {
    // this.app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '/../../', 'client', 'build', 'index.html'));
    // });
    this.app.listen(this.port, () => {
      console.log("---------------------------------------------");
      console.log(italic(`App listening on the http://localhost:${this.port}`));
      connectDatabase();
    });
  }
}
