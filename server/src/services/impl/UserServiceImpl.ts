import { IUser } from "../../models/User";
import UserDAO from "../../dao/UserDAO";
import { FilterQuery } from "mongoose";
import { hashPassword } from "../../utils/BcryptUtils";
import { UserService } from "services/UserService";
import { ErrorResponse } from "../../errors/ErrorResponse";

class UserServiceImpl implements UserService {
  private userDao = UserDAO;

  public async createUser(user: any) {
    console.log("create user");
    const hashedPassword: string = await hashPassword(user.password);
    user.password = hashedPassword;
    const user_1 = user;
    return this.userDao.insertUser(user_1);
  }

  public async findOneOrFail(condition: FilterQuery<IUser>) {
    const user = await this.userDao.findOne(condition);
    if (user) {
      user.password = undefined;
      return user;
    } else {
      throw new ErrorResponse("User not found");
    }
  }
}

export default new UserServiceImpl();
