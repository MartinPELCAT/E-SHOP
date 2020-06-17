import { IUser } from "../../models/User";
import UserDAO from "../../dao/UserDAO";
import { FilterQuery } from "mongoose";
import { AuthenticationService } from "services/AuthenticationService";
import { ErrorResponse } from "../../errors/ErrorResponse";
import { compare } from "bcrypt";

class AuthenticationServiceImpl implements AuthenticationService {
  private userDAO = UserDAO;

  public generateNewToken(user: IUser): Promise<IUser> {
    return this.userDAO.generateNewToken(user);
  }

  public async findUserOrFail(condition: FilterQuery<IUser>, password: string) {
    let user = await this.userDAO.findOne(condition);
    if (user && user.password) {
      let passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        return user;
      } else {
        throw new ErrorResponse("Password dont match");
      }
    } else {
      throw new ErrorResponse("User not found");
    }
  }
}

export default new AuthenticationServiceImpl();
