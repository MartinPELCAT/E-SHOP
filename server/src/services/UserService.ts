import { IUser } from "../models";
import { UserDAO } from "../dao";
import { FilterQuery } from "mongoose";
import { Promise } from "bluebird";
import { hashPassword } from "../utils";

class UserService {
  private userDao = UserDAO;

  public createUser(user: any): Promise<IUser> {
    return new Promise((resolve, reject) => {
      hashPassword(user.password)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          this.userDao
            .insertUser(user)
            .then((insertedUser) => {
              resolve(insertedUser);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public findOneOrFail(condition: FilterQuery<IUser>): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.userDao
        .findOne(condition)
        .then((user) => {
          if (user) {
            user.password = undefined;
            resolve(user);
          } else {
            reject(new Error("User not found"));
          }
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}

export default new UserService();
