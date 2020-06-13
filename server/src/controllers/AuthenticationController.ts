import { Request, Response, NextFunction } from "express";
import { IUser } from "../models";
import { AuthenticationService, UserService } from "../services";
import { isValidBody, setSessionCookie, clearSessionCookie } from "../utils";
import { Controller, Post, Get } from "../decorators/ApiFramework";

@Controller("/auth")
export default class AuthenticationController {
  private authenticationService = AuthenticationService;
  private userService = UserService;

  @Post("/login", [clearSessionCookie])
  public login(req: Request, res: Response, next: NextFunction) {
    let { email, password, rememberMe } = req.body;
    this.authenticationService
      .findUserOrFail({ email: email }, password)
      .then((user) => {
        setSessionCookie(res, user, rememberMe);
        return res.send({ user, message: "You are now logged", sucess: true });
      })
      .catch((err: Error) => {
        return res.status(401).json({ message: err.message });
      });
  }

  @Post("/register")
  public register(req: Request, res: Response) {
    let { email, password, lastname, firstname, username }: IUser = req.body;
    let userParameters = { email, password, lastname, firstname, username };
    if (!isValidBody(req.body, userParameters)) {
      return res.status(400).json({ message: "Unkonwn parameters" });
    }
    this.userService
      .createUser({ password, firstname, lastname, email, username })
      .then((createdUser) => {
        this.authenticationService
          .generateNewToken(createdUser)
          .then((user) => {
            return res.status(201).json(user);
          })
          .catch(() => {
            return res.status(500).json({ message: "Internal Error" });
          });
      })
      .catch(() => {
        return res.status(500).json({ message: "Internal Error" });
      });
  }

  @Get("/checkCurrentUser")
  public isLogged(req: Request, res: Response) {
    let token = req.signedCookies._UID;
    if (!token) {
      return res.send({ isConnected: false });
    }

    this.userService
      .findOneOrFail({ token: token })
      .then((user) => {
        return res.send({ isConnected: true, user });
      })
      .catch(() => {
        return res.send({ isConnected: false });
      });
  }

  @Post("/logout", [clearSessionCookie])
  public logout(req: Request, res: Response) {
    console.log("Log out");

    return res.send({ sucess: true, message: "You are now logged out" });
  }
}
