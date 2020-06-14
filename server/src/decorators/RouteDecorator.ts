import { Router } from "express";

type Methodes = "get" | "post" | "put" | "delete";
interface EndPointDescriptor {
  target: any;
  url: string;
  methode: Methodes;
  functionName: string;
  middlewares?: Array<Function>;
}

export const router = Router();

const generateRoute = (
  baseUrl: string,
  route: EndPointDescriptor,
  constructor: any
) => {
  let fullUrl = `${baseUrl}${route.url}`;
  let allMiddlewares = [
    ...(route.middlewares || []),
    constructor.prototype[`${route.functionName}`].bind(constructor.prototype),
  ];
  switch (route.methode) {
    case "get":
      router.get(fullUrl, allMiddlewares);
      break;
    case "post":
      router.post(fullUrl, allMiddlewares);
      break;
    case "delete":
      router.delete(fullUrl, allMiddlewares);
      break;
    case "put":
      router.put(fullUrl, allMiddlewares);
      break;
  }
};

const addEnpointToController = ({
  functionName,
  methode,
  url,
  target,
  middlewares,
}: EndPointDescriptor): void => {
  if (!!target.routes) {
    let existingRoute = target.routes[functionName];
    if (!!existingRoute) {
      target.routes = {
        ...target.routes,
        [`${functionName}`]: {
          url,
          methode,
          functionName,
          middlewares: [
            ...(existingRoute.middlewares || []),
            ...(middlewares || []),
          ],
        },
      };
    } else {
      target.routes = {
        ...target.routes,
        [`${functionName}`]: {
          url,
          methode,
          functionName,
          middlewares,
        },
      };
    }
  } else {
    target.routes = {
      [`${functionName}`]: { url, functionName, middlewares, methode },
    };
  }
};

export const Controller = (baseUrl: string): Function => {
  return function (constructor: any) {
    constructor.prototype.services &&
      constructor.prototype.services.forEach((service: any) => {
        constructor.prototype[service.key] = service.module.default;
      });
    if (!!constructor.prototype.routes) {
      let keys = Object.keys(constructor.prototype.routes);
      keys.forEach((key) => {
        let route = constructor.prototype.routes[key];
        generateRoute(baseUrl, route, constructor);
      });
    }
  };
};

export const Get = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { getEndPoints: Array<EndPointDescriptor> | undefined },
    functionName: string
  ) {
    addEnpointToController({
      functionName,
      methode: "get",
      middlewares,
      url,
      target,
    });
  };
};

export const Post = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { routes: Array<EndPointDescriptor> | undefined },
    functionName: string
  ) {
    addEnpointToController({
      functionName,
      methode: "post",
      middlewares,
      url,
      target,
    });
  };
};

export const Put = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { putEndPoints: Array<EndPointDescriptor> | undefined },
    functionName: string
  ) {
    addEnpointToController({
      functionName,
      methode: "put",
      middlewares,
      url,
      target,
    });
  };
};

export const Delete = (
  url: string,
  middlewares?: Array<Function>
): Function => {
  return function (
    target: { deleteEndPoints: Array<EndPointDescriptor> | undefined },
    functionName: string
  ) {
    addEnpointToController({
      functionName,
      methode: "delete",
      middlewares,
      url,
      target,
    });
  };
};

export const Autowired = (target: any, key: string) => {
  let module = require(`../services/impl/${key}Impl`);
  if (!!target.services) {
    target.services = [...target.services, { key, module }];
  } else {
    target.services = [{ key, module }];
  }
};
