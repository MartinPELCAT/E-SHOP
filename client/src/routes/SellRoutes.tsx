import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";

export default class SellRoutes extends Component<RouteComponentProps> {
  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/`}>Dashboard</Route>
      </Switch>
    );
  }
}
