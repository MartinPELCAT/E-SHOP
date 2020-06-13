import { Translate } from "./Decorators";

export interface ICategorie {
  id: string;
  name: string;
  subCategorie?: ICategorie;
}

export default class Categorie implements ICategorie {
  id: string;

  @Translate({ i18n_key: "category_name" })
  public name: string;

  subCategorie?: ICategorie | undefined;

  constructor(args: { id: string; name: string; subCategorie?: ICategorie }) {
    this.id = args.id;
    this.name = args.name;
    this.subCategorie = args.subCategorie;
    console.log(this.name);
  }
}
