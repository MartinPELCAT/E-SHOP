import React, { Component } from "react";
import { BasketContext as Context } from "./BasketContext";
export default class BasketContext extends Component {
  render() {
    return (
      <Context.Provider value={{
        
      }}> {this.props.children}</Context.Provider>
    );
  }
}
