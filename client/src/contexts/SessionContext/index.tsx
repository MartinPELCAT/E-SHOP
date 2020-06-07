import React, { Component } from "react";
import { SessionContext as Context } from "./context";
export default class SessionContext extends Component {
  componentDidMount() {
    //TODO :load connected user
  }
  render() {
    return (
      <Context.Provider
        value={{
          user: { displayName: "Martin PELCAT" },
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
