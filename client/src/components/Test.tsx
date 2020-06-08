import React, { Component } from "react";
import ProtectedComponent from "./ProtectedComponent";

export default class Test extends Component {
  render() {
    return <ProtectedComponent>{"dsadsad"}</ProtectedComponent>;
  }
}
