"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBody = (body, parameters) => {
  let bodyKeys = Object.keys(body);
  let interfaceKeys = Object.keys(parameters);
  return bodyKeys.every((e) => interfaceKeys.includes(e));
};
