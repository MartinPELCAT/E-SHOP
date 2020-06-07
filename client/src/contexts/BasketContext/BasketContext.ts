import { createContext } from "react";

interface IBasketContext {
  items?: Array<any>;
}

export const BasketContext = createContext({});
