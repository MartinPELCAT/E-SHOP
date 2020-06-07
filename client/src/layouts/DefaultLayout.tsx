import React, { Component } from "react";
import AppBar from "../components/AppBar";
export default class DefaultLayout extends Component {
  render() {
    return (
      <>
        <AppBar /> {this.props.children}
      </>
    );
  }
}
