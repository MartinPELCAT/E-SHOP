import { AuthMiddleware } from "../middlewares/AuthMiddlewares";

export const Authenticated = (_data?: { roles: Array<string> }) => {
  return function (target: any, functionName: string) {
    if (!!target.routes && target.routes[functionName]) {
      //Existing route
    } else {
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
