import { IUser } from "models/User";
import { FilterQuery } from "mongoose";

export interface AuthenticationService {
  generateNewToken(user: IUser): Promise<IUser>;
  findUserOrFail(
    condition: FilterQuery<IUser>,
    password: string
  ): Promise<IUser>;
}
