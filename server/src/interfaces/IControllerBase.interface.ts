import { Router } from "express";

export default interface IControllerBase {
    controllerPath : string;
    initRoutes(): void;
    router: Router;
}