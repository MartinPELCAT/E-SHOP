"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chalk_1 = require("chalk");
exports.connectDatabase = () => {
  mongoose_1
    .connect("mongodb://localhost:27017/e-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(chalk_1.green("Connexion à MongoDB réussie !")))
    .catch(() => console.log(chalk_1.red("Connexion à MongoDB échouée !")));
};
