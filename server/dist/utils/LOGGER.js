"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const myFormat = winston.format.printf((info) => {
  return `${new Date().toLocaleString()}: ${info.message}: ${info.stack}`;
});
class LOGGER {
  static createLogger(object) {
    let controllerName = Object.getPrototypeOf(object).constructor.name;
    return winston.createLogger({
      defaultMeta: { service: controllerName },
      format: myFormat,
      transports: [
        new winston.transports.File({
          filename: `logs/error-${controllerName}.log`,
          level: "error",
        }),
      ],
    });
  }
}
exports.default = LOGGER;
