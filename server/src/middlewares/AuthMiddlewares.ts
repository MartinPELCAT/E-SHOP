import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const AuthMiddleware = (_data?: { roles: Array<string> }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.signedCookies._UID;
    if (!token) {
      return res.status(403).json({ message: "You are not logged" });
    } else {
      User.findOne({ token })
        .then((user) => {
          if (user) {
            res.locals.user = user;
            return next();
          } else {
            return res.status(403).json({ message: "You are not logged" });
          }
        })
        .catch(() => {
          return res.status(403).json({ message: "You are not logged" });
        });
    }
  };
};
