import mongoose = require("mongoose");
import * as chalk from 'chalk';
import Bluebird = require("bluebird");
mongoose.Promise = Bluebird;

export const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/e-shop', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log(chalk.green('Connexion à MongoDB réussie !')))
        .catch((e) => console.log(chalk.red('Connexion à MongoDB échouée !', e)));
}