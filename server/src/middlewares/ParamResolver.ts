import { Request, Response, NextFunction } from "express";
import { router } from "../decorators/Framework";
import UserServiceImpl from "../services/impl/UserServiceImpl";

export const useUserParamResolver = () => {
  router.param("user", function (
    _req: Request,
    res: Response,
    next: NextFunction,
    id: string
  ) {
    UserServiceImpl.findOneOrFail({ _id: id })
      .then((user) => {
        res.locals.userParam = user;
        return next();
      })
      .catch(() => {
        res
          .status(404)
          .send({ errors: [{ message: `User ${id} does not exist` }] });
      });
  });
};
