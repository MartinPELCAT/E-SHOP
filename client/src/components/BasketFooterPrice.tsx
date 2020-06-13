import React, { Component } from "react";
import { BasketContext } from "../contexts/BasketContext/BasketContext";
import { getBasketTotalPrice } from "../utils/basketUtils";

export default class BasketFooterPrice extends Component {
  render() {
    return (
      <BasketContext.Consumer>
        {({ items }) => (
          <div className="basket-items-footer">{`${getBasketTotalPrice(
            items!
          )}€`}</div>
        )}
      </BasketContext.Consumer>
    );
  }
}
