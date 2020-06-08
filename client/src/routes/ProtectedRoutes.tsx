import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import UserRoutes from "./UserRoutes";
import DefaultLayout from "../layouts/DefaultLayout";

export default class ProtectedRoutes extends Component<RouteComponentProps> {
  render() {
    console.log(this.props.match);
    return (
      <DefaultLayout>
        <Switch>
          <Route
            path={`/profile`}
            component={UserRoutes}
          />
        </Switch>
      </DefaultLayout>
    );
  }
}
