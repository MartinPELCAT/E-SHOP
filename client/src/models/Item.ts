export interface Item {
  id: string;
  title: string;
  unitPrice: number;
}

export interface BasketItem {
  item: Item;
  quantity: number;
}
