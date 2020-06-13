import React, { Component } from "react";
import { AppBar as Bar, Toolbar, Typography, Button } from "@material-ui/core";
import { SessionContext } from "../contexts/SessionContext/context";
import { Link } from "react-router-dom";
import LoggedAppBarItem from "./LoggedAppBarItem";
import Basket from "./Basket";
import { i18n } from "../utils/translationUtils";

export default class AppBar extends Component {
  render() {
    return (
      <div className="fg-1">
        <Bar
          position="static"
          elevation={0}
          style={{ backgroundColor: "#fff", color: "#333" }}
        >
          <Toolbar>
            <Typography variant="h6" className="fg-1">
              <Link to="/" className="link-inherit">
                E-Shop
              </Link>
            </Typography>
            <Basket />
            <SessionContext.Consumer>
              {({ user }) => {
                return (
                  <>
                    {!!user ? (
                      <LoggedAppBarItem user={user} />
                    ) : (
                      <Button color="inherit">{i18n("login")}</Button>
                    )}
                  </>
                );
              }}
            </SessionContext.Consumer>
          </Toolbar>
        </Bar>
      </div>
    );
  }
}
