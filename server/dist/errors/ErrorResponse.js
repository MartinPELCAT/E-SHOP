"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
  constructor(msg) {
    this.toJson = () => {
      return { message: this.message };
    };
    let { message, name, stack } = new Error(msg);
    this.message = message;
    this.name = name;
    this.stack = stack;
  }
}
exports.ErrorResponse = ErrorResponse;
