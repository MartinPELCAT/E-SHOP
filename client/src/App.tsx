import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicationContext from "./contexts/ApplicationContext";
import "./app.scss";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DefaultLayout from "./layouts/DefaultLayout";
import Default from "./pages/Default";

export default class App extends Component {
  render() {
    return (
      <ApplicationContext>
        <Router>
          <Switch>
            {/*Public Routes */}
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/"} component={Default} />
            {/* Protected Routes */}

            <Route component={ProtectedRoutes} />
          </Switch>
        </Router>
      </ApplicationContext>
    );
  }
}
