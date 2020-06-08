import React, { Component } from "react";
import { SessionContext as Context } from "./context";
import { name } from "faker";

export default class SessionContext extends Component {
  componentDidMount() {
    //TODO :load connected user
  }
  render() {
    return (
      <Context.Provider
        value={{
          user: { displayName: `${name.findName()}` },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
