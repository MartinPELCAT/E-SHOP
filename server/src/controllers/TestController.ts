import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Authenticated,
} from "../decorators/Framework";
import { Response, Request } from "express";
@Controller("/test")
export default class TestController {
  @Get("/get/:user")
  public get(_req: Request, res: Response): Response {
    console.log("TC-Endoint");
    return res.send("YO get");
  }

  @Post("/post")
  @Authenticated({ roles: ["postRole"] })
  public post(req: Request, res: Response): Response {
    console.log(req.body);
    return res.send("YO post");
  }

  @Delete("/delete")
  public delete(_req: Request, res: Response): Response {
    return res.send("YO delete");
  }

  @Put("/put")
  public put(_req: Request, res: Response): Response {
    return res.send("YO put");
  }
}
