import { IUser } from "../models";
import { UserDAO } from "../dao";
import { FilterQuery } from "mongoose";
import { comparePassword } from "../utils";

class AuthenticationService {
  private userDAO = UserDAO;

  public generateNewToken(user: IUser): Promise<IUser> {
    return this.userDAO.generateNewToken(user);
  }

  public findUserOrFail(
    condition: FilterQuery<IUser>,
    password: string
  ): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.userDAO
        .findOne(condition)
        .then((user) => {
          if (user && user.password) {
            comparePassword(password, user.password)
              .then(() => {
                user.password = undefined; // dont send back password in response
                resolve(user);
              })
              .catch(() => {
                reject(new Error("User not found"));
              });
          } else {
            reject(new Error("User not found"));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new AuthenticationService();
