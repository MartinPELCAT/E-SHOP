import { BasketItem } from "../models/Item";

export const getBasketTotalPrice = (basketItems: Array<BasketItem>): number => {
  let accumulator = 0;
  basketItems!.forEach(
    (basketItem) =>
      (accumulator += basketItem.item.unitPrice * basketItem.quantity)
  );
  return accumulator;
};
