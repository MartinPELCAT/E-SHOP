import { IUser } from "models/User";
import { FilterQuery } from "mongoose";

export interface UserService {
  createUser(user: any): Promise<IUser>;
  findOneOrFail(condition: FilterQuery<IUser>): Promise<IUser>;
}
