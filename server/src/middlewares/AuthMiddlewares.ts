import { Request, Response, NextFunction } from "express";
import UserServiceImpl from "../services/impl/UserServiceImpl";

export const AuthMiddleware = (_data?: { roles: Array<string> }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.signedCookies._UID;
    if (!token) {
      return res.status(403).json({ message: "You are not logged" });
    } else {
      UserServiceImpl.findOneOrFail({ token })
        .then((user) => {
          req.user = user;
          return next();
        })
        .catch(() => {
          return res.status(403).json({ message: "You are not logged" });
        });
    }
  };
};
