import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import UserRoutes from "./UserRoutes";
import DefaultLayout from "../layouts/DefaultLayout";
import { SessionContext } from "../contexts/SessionContext/context";
import SellRoutes from "./SellRoutes";
import Error403 from "../errors/Error403";

export default class ProtectedRoutes extends Component<RouteComponentProps> {
  render() {
    return (
      <DefaultLayout>
        <SessionContext.Consumer>
          {({ user }) => {
            if (!!user) {
              return (
                <Switch>
                  <Route path={`/profile`} component={UserRoutes} />
                  <Route path={"/sell"} component={SellRoutes} />
                </Switch>
              );
            } else {
              return <Error403 />;
            }
          }}
        </SessionContext.Consumer>
      </DefaultLayout>
    );
  }
}
