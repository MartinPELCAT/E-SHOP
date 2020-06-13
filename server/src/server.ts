import App from "./app";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { AuthenticationController } from "./controllers";
import * as compression from "compression";
import * as helmet from "helmet";
import * as CookieParser from "cookie-parser";

require("../src/controllers/TestController");

const app = new App({
  port: 1604,
  controllers: [new AuthenticationController()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true, limit: "10kb" }),
    cors(),
    compression(),
    helmet(),
    helmet.hidePoweredBy({ setTo: "Django" }),
    CookieParser("lW@TXE}RNJDoa`0D#&.e?3_vZ}n?P;"),
  ],
});

app.listen();
