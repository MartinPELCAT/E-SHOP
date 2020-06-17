import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Authenticated,
  Autowired,
} from "../decorators/Framework";
import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { ErrorResponse } from "errors/ErrorResponse";
@Controller("/test")
export default class TestController {
  @Autowired
  private userService!: UserService;

  @Get("/get/:userid")
  public get(req: Request, res: Response) {
    this.userService
      .findOneOrFail({ _id: req.params.userid })
      .then((user) => res.send(user))
      .catch((error: ErrorResponse) => {
        return res.send(error.toJson());
      });
  }

  @Post("/post")
  @Authenticated({ roles: ["postRole"] })
  public post(req: Request, res: Response) {
    console.log(req.body);
    return res.send("YO post");
  }

  @Delete("/delete")
  public delete(_req: Request, res: Response) {
    return res.send("YO delete");
  }

  @Put("/put")
  public put(_req: Request, res: Response) {
    return res.send("YO put");
  }
}
