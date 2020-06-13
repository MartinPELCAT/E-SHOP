import React, { Component } from "react";
import { BasketContext as Context } from "./BasketContext";
import { Item, BasketItem } from "../../models/Item";

const items: Array<BasketItem> = [
  {
    item: { id: "1", title: "item title 1", unitPrice: 12 },
    quantity: 1,
  },
  {
    item: { id: "2", title: "item title 2", unitPrice: 12 },
    quantity: 2,
  },
  {
    item: { id: "3", title: "item title 3", unitPrice: 12 },
    quantity: 3,
  },
  {
    item: { id: "4", title: "item title 4", unitPrice: 12 },
    quantity: 4,
  },
  {
    item: { id: "5", title: "item title 5", unitPrice: 12 },
    quantity: 5,
  },
  {
    item: { id: "6", title: "item title 1", unitPrice: 12 },
    quantity: 1,
  },
  {
    item: { id: "7", title: "item title 2", unitPrice: 12 },
    quantity: 2,
  },
  {
    item: { id: "8", title: "item title 3", unitPrice: 12 },
    quantity: 3,
  },
  {
    item: { id: "9", title: "item title 4", unitPrice: 12 },
    quantity: 4,
  },
  {
    item: { id: "10", title: "item title 5", unitPrice: 12 },
    quantity: 5,
  },
];

interface States {
  items: Array<BasketItem>;
}

export default class BasketContext extends Component<{}, States> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      items: items,
    };
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleRemoveItem(itemRemove: Item): void {
    this.setState({
      items: this.state.items.filter(({ item }) => {
        return itemRemove.id !== item.id;
      }),
    });
  }

  handleAddItem(addItem: Item, addQuantity: number): void {
    let existingObject = this.state.items.find(
      ({ item }) => item.id === addItem.id
    );
    if (!!existingObject) {
      this.setState({
        items: this.state.items.map((basketItem) => {
          if (basketItem.item.id === addItem.id) {
            return { ...basketItem, quantity: addQuantity }; // change existing item quantity
          }
          return basketItem;
        }),
      });
    } else {
      this.setState({
        items: [...this.state.items, { item: addItem, quantity: addQuantity }], //Simply add item
      });
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          items: this.state.items,
          removeItem: this.handleRemoveItem,
          addItem: this.handleAddItem,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
