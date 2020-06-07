import { IUser, User } from "../models/User";
import { FilterQuery } from "mongoose";
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from "../config/KEYS";

class UserDao {

    public insertUser(parameters: IUser): Promise<IUser> {
        delete parameters._id;
        return User.create(parameters);
    }

    public findOne(condition: FilterQuery<IUser>): Promise<IUser> {
        return User.findOne(condition).exec();
    }

    public generateNewToken(user: IUser): Promise<IUser> {
        user.token = sign({ id: user._id, firstname: user.firstname, lastname: user.lastname, photoPath: user.photoPath, signedOn: new Date() }, JWT_SECRET);
        return user.save();
    }
}

export default new UserDao();