import React, { Component } from "react";
import { BasketContext as Context } from "./BasketContext";
import { Item } from "../../models/Item";

const items: Array<{ item: Item; quantity: number }> = [
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
    quantity: 2,
  },
  {
    item: { id: "4", title: "item title 4", unitPrice: 12 },
    quantity: 2,
  },
  {
    item: { id: "5", title: "item title 5", unitPrice: 12 },
    quantity: 2,
  },
];

interface States {
  items: Array<{ item: Item; quantity: number }>;
}

export default class BasketContext extends Component<{}, States> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      items: items,
    };
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(itemRemove: Item) {
    this.setState(
      {
        items: this.state.items.filter(({ item }) => {
          return itemRemove.id !== item.id;
        }),
      },
      () => console.log(this.state.items)
    );
  }

  render() {
    return (
      <Context.Provider
        value={{
          items: this.state.items,
          removeItem: this.handleRemoveItem,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
