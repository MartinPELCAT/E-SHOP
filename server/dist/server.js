"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const CookieParser = require("cookie-parser");
const app = new app_1.default({
  port: 1604,
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
