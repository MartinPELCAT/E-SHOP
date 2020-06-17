"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddlewares_1 = require("../middlewares/AuthMiddlewares");
const chalk_1 = require("chalk");
exports.router = express_1.Router();
const generateRoute = (baseUrl, route, constructor) => {
  let fullUrl = `${baseUrl}${route.url}`;
  let allMiddlewares = [
    ...(route.middlewares || []),
    constructor.prototype[`${route.functionName}`].bind(constructor.prototype),
  ];
  switch (route.methode) {
    case "get":
      exports.router.get(fullUrl, allMiddlewares);
      break;
    case "post":
      exports.router.post(fullUrl, allMiddlewares);
      break;
    case "delete":
      exports.router.delete(fullUrl, allMiddlewares);
      break;
    case "put":
      exports.router.put(fullUrl, allMiddlewares);
      break;
    default:
      exports.router.all(fullUrl, allMiddlewares);
      break;
  }
};
const addEnpointToController = ({
  functionName,
  methode,
  url,
  target,
  middlewares,
}) => {
  if (!!target.routes) {
    let existingRoute = target.routes[functionName];
    if (!!existingRoute) {
      target.routes = Object.assign(Object.assign({}, target.routes), {
        [`${functionName}`]: {
          url: url || existingRoute.url,
          target,
          methode: methode || existingRoute.methode,
          functionName,
          middlewares: [
            ...(existingRoute.middlewares || []),
            ...(middlewares || []),
          ],
        },
      });
    } else {
      target.routes = Object.assign(Object.assign({}, target.routes), {
        [`${functionName}`]: {
          url,
          methode,
          target,
          functionName,
          middlewares,
        },
      });
    }
  } else {
    target.routes = {
      [`${functionName}`]: { url, functionName, middlewares, methode, target },
    };
  }
};
exports.Controller = (baseUrl) => {
  return function (constructor) {
    constructor.prototype.services &&
      constructor.prototype.services.forEach((service) => {
        constructor.prototype[service.key] = service.module.default;
      });
    if (!!constructor.prototype.routes) {
      let keys = Object.keys(constructor.prototype.routes);
      keys.forEach((key) => {
        let route =
          constructor.prototype.routes && constructor.prototype.routes[key];
        generateRoute(baseUrl, route, constructor);
      });
    }
  };
};
exports.Get = (url, middlewares) => {
  return function (target, functionName) {
    addEnpointToController({
      functionName,
      methode: "get",
      middlewares,
      url,
      target,
    });
  };
};
exports.Post = (url, middlewares) => {
  return function (target, functionName) {
    addEnpointToController({
      functionName,
      methode: "post",
      middlewares,
      url,
      target,
    });
  };
};
exports.Put = (url, middlewares) => {
  return function (target, functionName) {
    addEnpointToController({
      functionName,
      methode: "put",
      middlewares,
      url,
      target,
    });
  };
};
exports.Delete = (url, middlewares) => {
  return function (target, functionName) {
    addEnpointToController({
      functionName,
      methode: "delete",
      middlewares,
      url,
      target,
    });
  };
};
/**
 * @description auto import service to a given property name
 * propertyName must fit fileName
 */
exports.Autowired = (target, key) => {
  try {
    let module = require(`../services/impl/${key}Impl`);
    if (target.services) {
      target.services = [...target.services, { key, module }];
    } else {
      target.services = [{ key, module }];
    }
  } catch (error) {
    console.error(chalk_1.red(error));
  }
};
exports.Authenticated = (data) => {
  return function (target, functionName) {
    if (!!target.routes && target.routes[functionName]) {
      //TODO : add AuthMiddleware to existing route appends if @Authenticated is before @Get
    } else if (!!target.routes) {
      target.routes = Object.assign(Object.assign({}, target.routes), {
        [`${functionName}`]: {
          url: null,
          target,
          methode: null,
          functionName,
          middlewares: [AuthMiddlewares_1.AuthMiddleware(data)],
        },
      });
    } else {
      target.routes = {
        [`${functionName}`]: {
          url: null,
          target,
          methode: null,
          functionName,
          middlewares: [AuthMiddlewares_1.AuthMiddleware(data)],
        },
      };
    }
  };
};
