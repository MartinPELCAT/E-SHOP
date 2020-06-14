import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
} from "../decorators/RouteDecorator";
import { Response, Request } from "express";
import { Authenticated } from "../decorators/AuthenticationDecorator";
@Controller("/test")
export default class TestController {
  @Get("/get")
  @Authenticated()
  public endpoint(_req: Request, res: Response): Response {
    console.log("TC-Endoint");
    return res.send("YO get");
  }

  @Post("/post")
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
