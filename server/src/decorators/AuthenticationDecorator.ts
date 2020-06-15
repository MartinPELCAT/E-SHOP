import { AuthMiddleware } from "../middlewares/AuthMiddlewares";

export const Authenticated = (_data?: { roles: Array<string> }) => {
  //Must be just on top of route
  return function (target: any, functionName: string) {
    if (!(!!target.routes && target.routes[functionName])) {
      target.routes = {
        [`${functionName}`]: {
          url: "",
          methode: "",
          functionName,
          middlewares: [AuthMiddleware],
        },
      };
    }
  };
};
