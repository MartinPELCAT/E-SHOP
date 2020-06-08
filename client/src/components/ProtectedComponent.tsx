import React, { Component } from "react";
import { SessionContext } from "../contexts/SessionContext/context";
import Error403 from "../errors/Error403";

interface Props {
  children: React.ReactNode;
}

export default class ProtectedComponent extends Component<Props> {
  render() {
    return (
      <SessionContext.Consumer>
        {({ user }) => {
          if (!!user) {
            return <div>{this.props.children}</div>;
          } else {
            return <Error403 />;
          }
        }}
      </SessionContext.Consumer>
    );
  }
}
