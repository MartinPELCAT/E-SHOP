"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema(
  {
    username: { type: String, required: false, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    },
    password: { type: String, required: true },
    photoPath: { type: String, required: false },
    token: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
exports.User = mongoose_1.model("User", UserSchema);
