import * as express from "express";
import { Application } from "express";
import IControllerBase from "interfaces/IControllerBase.interface";
import * as chalk from "chalk";
import * as path from "path";
import { connectDatabase } from "./config/database";

export default class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.app.use(
      express.static(path.join(__dirname, "/../../", "client", "build"))
    );
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: IControllerBase) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use("/api" + controller.controllerPath, controller.router);
    });
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
