import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicationContext from "./contexts/ApplicationContext";
import DefaultLayout from "./layouts/DefaultLayout";
import "./app.scss";

export default class App extends Component {
  render() {
    return (
      <ApplicationContext>
        <Router>
          <DefaultLayout>
            <Switch>
              <Route exact path={"/"}>
                <div>path : /</div>
              </Route>
              <Route path={"/admin"} />
            </Switch>
          </DefaultLayout>
        </Router>
      </ApplicationContext>
    );
  }
}
