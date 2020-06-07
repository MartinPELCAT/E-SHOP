import React, { Component } from "react";
import SessionContext from "./SessionContext";
import BasketContext from "./BasketContext";

export default class ApplicationContext extends Component {
  render() {
    return (
      <SessionContext>
        <BasketContext>{this.props.children}</BasketContext>
      </SessionContext>
    );
  }
}
