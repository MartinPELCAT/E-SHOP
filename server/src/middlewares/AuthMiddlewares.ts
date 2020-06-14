import { Request, Response, NextFunction } from "express";
import UserServiceImpl from "../services/impl/UserServiceImpl";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.signedCookies._UID;
  if (!token) {
    return res.status(403).json({ message: "You are not logged" });
  } else {
    UserServiceImpl.findOneOrFail({ token })
      .then((user) => {
        req.body.currentUser = user;
        return next();
      })
      .catch(() => {
        return res.status(403).json({ message: "You are not logged" });
      });
  }
};
