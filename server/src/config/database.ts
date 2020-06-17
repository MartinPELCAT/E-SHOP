import { connect } from "mongoose";
import { green, red } from "chalk";

export const connectDatabase = () => {
  connect("mongodb://localhost:27017/e-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() => console.log(green("Connexion à MongoDB réussie !")))
    .catch(() => console.log(red("Connexion à MongoDB échouée !")));
};
