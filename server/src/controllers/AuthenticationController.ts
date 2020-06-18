import { Request, Response } from "express";
import { clearSessionCookie, setSessionCookie } from "../utils/CookieUtils";
import { Controller, Post, Get, Autowired } from "../decorators/Framework";
import { AuthenticationService } from "../services/AuthenticationService";
import { UserService } from "../services/UserService";
import { registerForm, loginForm } from "../formSchemas/authenticationForms";

@Controller("/auth")
export default class AuthenticationController {
  @Autowired
  private authenticationService!: AuthenticationService;

  @Autowired
  private userService!: UserService;

  @Post("/login", [clearSessionCookie])
  public login(req: Request, res: Response) {
    loginForm
      .validateAsync(req.body)
      .then(({ email, password, rememberMe }) => {
        return Promise.all([
          this.authenticationService.findUserOrFail({ email }, password),
          rememberMe, // boolean value
        ]);
      })
      .then(([user, rememberMe]) => {
        setSessionCookie(res, user, rememberMe);
        return res.send({ user, message: "You are now logged", sucess: true });
      })
      .catch((err) => {
        return res.status(401).json({ message: err.message });
      });
  }

  @Post("/register")
  public register(req: Request, res: Response) {
    registerForm
      .validateAsync(req.body, { cache: true })
      .then(({ lastname, firstname, password, email, username }) =>
        this.userService.createUser({
          lastname,
          firstname,
          password,
          email,
          username,
        })
      )
      .then((createdUser) => {
        return this.authenticationService.generateNewToken(createdUser);
      })
      .then((user) => {
        return res.status(201).send(user);
      })
      .catch((error) => {
        return res.status(500).send({ message: "Internal Error", error });
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
