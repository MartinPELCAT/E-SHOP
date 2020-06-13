import { createContext } from "react";
import { Item, BasketItem } from "../../models/Item";

interface IBasketContext {
  items?: Array<BasketItem>;
  addItem?(item: Item, quantity: number): void;
  removeItem?(item: Item): void;
}

export const BasketContext = createContext<IBasketContext>({});
