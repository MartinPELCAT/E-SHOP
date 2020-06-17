import { Request, Response } from "express";
import { IUser } from "../models/User";
import { setSessionCookie, clearSessionCookie } from "../utils/CookieUtils";
import { isValidBody } from "../utils/RequestParameters";
import { Controller, Post, Get, Autowired } from "../decorators/Framework";
import { AuthenticationService } from "services/AuthenticationService";
import { UserService } from "services/UserService";

@Controller("/auth")
export default class AuthenticationController {
  @Autowired
  private authenticationService!: AuthenticationService;

  @Autowired
  private userService!: UserService;

  @Post("/login", [clearSessionCookie])
  public login(req: Request, res: Response) {
    let { email, password, rememberMe } = req.body;
    this.authenticationService
      .findUserOrFail({ email }, password)
      .then((user: IUser) => {
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
      // TODO: use yup or hapi joi instead
      return res.status(400).json({ message: "Unkonwn parameters" });
    }
    this.userService
      .createUser({ password, firstname, lastname, email, username })
      .then((createdUser: any) => {
        this.authenticationService
          .generateNewToken(createdUser)
          .then((user: any) => {
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
      .then((user: any) => {
        return res.send({ isConnected: true, user });
      })
      .catch(() => {
        return res.send({ isConnected: false });
      });
  }

  @Post("/logout", [clearSessionCookie])
  public logout(_req: Request, res: Response) {
    return res.send({ sucess: true, message: "You are now logged out" });
  }
}
