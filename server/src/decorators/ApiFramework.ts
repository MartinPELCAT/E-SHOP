import { Router } from "express";

interface EndPointDescriptor {
  url: string;
  functionName: string;
  middlewares?: Array<Function>;
}

export const router = Router();

const getRouteUrl = (baseUrl: string, endPointUrl: string): string => {
  return `${baseUrl}${endPointUrl}`;
};

const getRouteMiddlewares = (
  constructor: any,
  endPoint: EndPointDescriptor
): Array<any> => {
  return [
    ...(endPoint.middlewares || []),
    constructor.prototype[`${endPoint.functionName}`].bind(
      constructor.prototype
    ),
  ];
};

const addEnpointToController = (
  target: any,
  key: string,
  url: string,
  propertyKey: string,
  middlewares?: Array<Function>
): void => {
  if (!!target[key]) {
    target[key] = [
      ...target[key],
      { url, functionName: propertyKey, middlewares },
    ];
  } else {
    target[key] = [{ url, functionName: propertyKey, middlewares }];
  }
};

export const Controller = (baseUrl: string): Function => {
  return function (constructor: {
    prototype: {
      getEndPoints: Array<EndPointDescriptor> | undefined;
      postEndPoints: Array<EndPointDescriptor> | undefined;
      putEndPoints: Array<EndPointDescriptor> | undefined;
      deleteEndPoints: Array<EndPointDescriptor> | undefined;
      [key: string]: any;
    };
  }) {
    constructor.prototype.services &&
      constructor.prototype.services.forEach((service: any) => {
        constructor.prototype[service.key] = service.module.default;
      });
    constructor.prototype.getEndPoints &&
      constructor.prototype.getEndPoints.forEach((endPoint) => {
        router.get(
          getRouteUrl(baseUrl, endPoint.url),
          getRouteMiddlewares(constructor, endPoint)
        );
      });

    constructor.prototype.postEndPoints &&
      constructor.prototype.postEndPoints.forEach((endPoint) => {
        router.post(
          getRouteUrl(baseUrl, endPoint.url),
          getRouteMiddlewares(constructor, endPoint)
        );
      });

    constructor.prototype.putEndPoints &&
      constructor.prototype.putEndPoints.forEach((endPoint) => {
        router.put(
          getRouteUrl(baseUrl, endPoint.url),
          getRouteMiddlewares(constructor, endPoint)
        );
      });

    constructor.prototype.deleteEndPoints &&
      constructor.prototype.deleteEndPoints.forEach((endPoint) => {
        router.delete(
          getRouteUrl(baseUrl, endPoint.url),
          getRouteMiddlewares(constructor, endPoint)
        );
      });
  };
};

export const Get = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { getEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    addEnpointToController(
      target,
      "getEndPoints",
      url,
      propertyKey,
      middlewares
    );
  };
};

export const Post = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { postEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    addEnpointToController(
      target,
      "postEndPoints",
      url,
      propertyKey,
      middlewares
    );
  };
};

export const Put = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { putEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    addEnpointToController(
      target,
      "putEndPoints",
      url,
      propertyKey,
      middlewares
    );
  };
};

export const Delete = (
  url: string,
  middlewares?: Array<Function>
): Function => {
  return function (
    target: { deleteEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    addEnpointToController(
      target,
      "deleteEndPoints",
      url,
      propertyKey,
      middlewares
    );
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
