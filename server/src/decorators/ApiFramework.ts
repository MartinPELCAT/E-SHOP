import { Router } from "express";

interface EndPointDescriptor {
  url: string;
  functionName: string;
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
        router.get(
          `${baseUrl}${endPoint.url}`,
          constructor.prototype[`${endPoint.functionName}`]
        );
      });

    constructor.prototype.postEndPoints &&
      constructor.prototype.postEndPoints.forEach((endPoint) => {
        router.post(
          `${baseUrl}${endPoint.url}`,
          constructor.prototype[`${endPoint.functionName}`]
        );
      });

    constructor.prototype.putEndPoints &&
      constructor.prototype.putEndPoints.forEach((endPoint) => {
        router.put(
          `${baseUrl}${endPoint.url}`,
          constructor.prototype[`${endPoint.functionName}`]
        );
      });

    constructor.prototype.deleteEndPoints &&
      constructor.prototype.deleteEndPoints.forEach((endPoint) => {
        router.delete(
          `${baseUrl}${endPoint.url}`,
          constructor.prototype[`${endPoint.functionName}`]
        );
      });
    console.log(constructor.prototype);
  };
};

export const Get = (url: string): Function => {
  return function (
    target: { getEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.getEndPoints) {
      target.getEndPoints = [
        ...target.getEndPoints,
        { url, functionName: propertyKey },
      ];
    } else {
      target.getEndPoints = [{ url, functionName: propertyKey }];
    }
  };
};

export const Post = (url: string): Function => {
  return function (
    target: { postEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.postEndPoints) {
      target.postEndPoints = [
        ...target.postEndPoints,
        { url, functionName: propertyKey },
      ];
    } else {
      target.postEndPoints = [{ url, functionName: propertyKey }];
    }
  };
};

export const Put = (url: string): Function => {
  return function (
    target: { putEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.putEndPoints) {
      target.putEndPoints = [
        ...target.putEndPoints,
        { url, functionName: propertyKey },
      ];
    } else {
      target.putEndPoints = [{ url, functionName: propertyKey }];
    }
  };
};

export const Delete = (url: string): Function => {
  return function (
    target: { deleteEndPoints: Array<EndPointDescriptor> | undefined },
    propertyKey: string
  ) {
    if (!!target.deleteEndPoints) {
      target.deleteEndPoints = [
        ...target.deleteEndPoints,
        { url, functionName: propertyKey },
      ];
    } else {
      target.deleteEndPoints = [{ url, functionName: propertyKey }];
    }
  };
};
