import { Router } from "express";

type Methodes = "get" | "post" | "put" | "delete";

type Service = { key: string; module: NodeRequire };

type Routes = { [key: string]: EndPointDescriptor };

interface EndPointDescriptor {
  target: ControllerDescriptor;
  url: string;
  methode: Methodes;
  functionName: string;
  middlewares?: Array<Function>;
}

interface ControllerDescriptor {
  routes: Routes;
  services: Array<Service>;
  [key: string]: any;
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
    default:
      router.all(fullUrl, allMiddlewares);
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
          target,
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
          target,
          functionName,
          middlewares,
        },
      };
    }
  } else {
    target.routes = {
      [`${functionName}`]: { url, functionName, middlewares, methode, target },
    };
  }
};

export const Controller = (baseUrl: string): Function => {
  return function (constructor: { prototype: ControllerDescriptor }) {
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
  return function (target: ControllerDescriptor, functionName: string) {
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
  return function (target: ControllerDescriptor, functionName: string) {
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
  return function (target: ControllerDescriptor, functionName: string) {
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
  return function (target: ControllerDescriptor, functionName: string) {
    addEnpointToController({
      functionName,
      methode: "delete",
      middlewares,
      url,
      target,
    });
  };
};

export const Autowired = (
  // autoImport service
  target: { services?: Array<Service> } | any,
  key: string
) => {
  let module = require(`../services/impl/${key}Impl`);
  if (target.services) {
    target.services = [...target.services, { key, module }];
  } else {
    target.services = [{ key, module }];
  }
};
