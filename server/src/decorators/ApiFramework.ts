import { Router } from "express";

interface EndPointDescriptor {
  url: string;
  functionName: string;
  middlewares?: Array<Function>;
}

export const router = Router();

export const Controller = (baseUrl: string): Function => {
  return function (constructor: {
    prototype: {
      getEndPoints: Array<EndPointDescriptor> | undefined;
      postEndPoints: Array<EndPointDescriptor> | undefined;
      putEndPoints: Array<EndPointDescriptor> | undefined;
      deleteEndPoints: Array<EndPointDescriptor> | undefined;
    };
  }) {
    constructor.prototype.getEndPoints &&
      constructor.prototype.getEndPoints.forEach((endPoint) => {
        router.get(`${baseUrl}${endPoint.url}`, [
          ...(endPoint.middlewares || []),
          constructor.prototype[`${endPoint.functionName}`],
        ]);
      });

    constructor.prototype.postEndPoints &&
      constructor.prototype.postEndPoints.forEach((endPoint) => {
        router.post(`${baseUrl}${endPoint.url}`, [
          ...(endPoint.middlewares || []),
          constructor.prototype[`${endPoint.functionName}`],
        ]);
      });

    constructor.prototype.putEndPoints &&
      constructor.prototype.putEndPoints.forEach((endPoint) => {
        router.put(`${baseUrl}${endPoint.url}`, [
          ...(endPoint.middlewares || []),
          constructor.prototype[`${endPoint.functionName}`],
        ]);
      });

    constructor.prototype.deleteEndPoints &&
      constructor.prototype.deleteEndPoints.forEach((endPoint) => {
        router.delete(`${baseUrl}${endPoint.url}`, [
          ...(endPoint.middlewares || []),
          constructor.prototype[`${endPoint.functionName}`],
        ]);
      });
  };
};

export const Get = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { getEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.getEndPoints) {
      target.getEndPoints = [
        ...target.getEndPoints,
        { url, functionName: propertyKey, middlewares },
      ];
    } else {
      target.getEndPoints = [{ url, functionName: propertyKey, middlewares }];
    }
  };
};

export const Post = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { postEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.postEndPoints) {
      target.postEndPoints = [
        ...target.postEndPoints,
        { url, functionName: propertyKey, middlewares },
      ];
    } else {
      target.postEndPoints = [{ url, functionName: propertyKey, middlewares }];
    }
  };
};

export const Put = (url: string, middlewares?: Array<Function>): Function => {
  return function (
    target: { putEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.putEndPoints) {
      target.putEndPoints = [
        ...target.putEndPoints,
        { url, functionName: propertyKey, middlewares },
      ];
    } else {
      target.putEndPoints = [{ url, functionName: propertyKey, middlewares }];
    }
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
    if (!!target.deleteEndPoints) {
      target.deleteEndPoints = [
        ...target.deleteEndPoints,
        { url, functionName: propertyKey, middlewares },
      ];
    } else {
      target.deleteEndPoints = [
        { url, functionName: propertyKey, middlewares },
      ];
    }
  };
};
