import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string | undefined;
  photoPath?: string;
  token?: string;
}

const UserSchema: Schema = new Schema(
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

export const User = model<IUser>("User", UserSchema);
