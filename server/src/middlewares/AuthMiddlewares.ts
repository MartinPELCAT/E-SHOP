import { ExtractJwt } from 'passport-jwt';
import { User } from '../models';
import { Request, Response, NextFunction } from 'express';


export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // let token = req.signedCookies._UID;
    // if (!token) {
    //     res.status(403).json({ message: "You are not logged" })
    // } else {
    //     const options: FindOptions = {
    //         where: {
    //             token: token
    //         }
    //     };

    //     User.findOne<User>(options).then(function (user: User) {
    //         if (!user) { return res.status(200).json({ message: "This token is not linked to any user" }) }
    //         req.user = user;
    //         return next();
    //     }).catch(function (err: Error) {
    //         return res.status(500).json({ message: "Internal error please try again" });
    //     });
    // }
}
