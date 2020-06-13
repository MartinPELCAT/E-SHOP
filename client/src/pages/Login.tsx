import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { i18n } from "../utils/translationUtils";
export default class Login extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{i18n("login", { qwert: "Test" })}</title>
        </Helmet>
        {i18n("login", { qwert: "Test" })}
      </div>
    );
  }
}
