import { createContext } from "react";
import { Item } from "../../models/Item";

interface IBasketContext {
  items?: Array<{ item: Item; quantity: number }>;
  addItem?(item: Item, quantity: number): void;
  removeItem?(item: Item): void;
}

export const BasketContext = createContext<IBasketContext>({});
