import { Request, Response, NextFunction } from "express";
import { router } from "../decorators/Framework";
import { User } from "../models/User";

export const useUserParamResolver = () => {
  router.param("user", function (
    _req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) {
    User.findOne({ _id: id })
      .then((user) => {
        if (user) {
          res.locals.userParam = user;
        } else {
          res
            .status(404)
            .send({ errors: [{ message: `User ${id} does not exist` }] });
        }
        return next();
      })
      .catch(() => {
        res
          .status(500)
          .send({ errors: [{ message: `Internal server error` }] });
      });
  });
};
