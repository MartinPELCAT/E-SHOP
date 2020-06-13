import { Controller, Get, Delete, Post, Put } from "../decorators/ApiFramework";
import { NextFunction, Response, Request } from "express";
@Controller("/test")
export default class TestController {
  constructor() {
    console.log("TestController constructor");
  }
  @Get("/get")
  public endpoint(_req: Request, res: Response, next: NextFunction): Response {
    console.log("TC-Endoint");

    return res.send("YO get");
  }

  @Post("/post")
  public post(req: Request, res: Response, next: NextFunction): Response {
    console.log(req.body);

    return res.send("YO post");
  }

  @Delete("/delete")
  public delete(req: Request, res: Response, next: NextFunction): Response {
    return res.send("YO delete");
  }

  @Put("/put")
  public put(req: Request, res: Response, next: NextFunction): Response {
    return res.send("YO put");
  }
}
