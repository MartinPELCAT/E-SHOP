import React, { Component } from "react";
import { SessionContext as Context } from "./context";
import { name } from "faker";
import { User } from "../../models/User";

interface States {
  user: User | null;
}

export default class SessionContext extends Component<{}, States> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      user: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    //TODO :load connected user
    this.setState({ user: { displayName: `${name.findName()}` } });
  }

  handleLogin = (): void => {
    //TODO: Call login api
  };

  handleLogOut = (): void => {
    // TODO : Call logout function
    this.setState({ user: null });
  };

  render() {
    return (
      <Context.Provider
        value={{
          user: this.state.user,
          login: this.handleLogin,
          logout: this.handleLogOut,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
