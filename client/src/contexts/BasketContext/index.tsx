import React, { Component } from "react";
import { BasketContext as Context } from "./BasketContext";
export default class BasketContext extends Component {
  render() {
    return (
      <Context.Provider
        value={{
          items: [
            {
              item: { id: "1", title: "item title", unitPrice: 12 },
              quantity: 1,
            },
            {
              item: { id: "2", title: "item title 2", unitPrice: 12 },
              quantity: 2,
            },
            {
              item: { id: "3", title: "item title 2", unitPrice: 12 },
              quantity: 2,
            },
            {
              item: { id: "4", title: "item title 2", unitPrice: 12 },
              quantity: 2,
            },
            {
              item: { id: "5", title: "item title 2", unitPrice: 12 },
              quantity: 2,
            },
          ],
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
