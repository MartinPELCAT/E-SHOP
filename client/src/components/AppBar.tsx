import React, { Component } from "react";
import { AppBar as Bar, Toolbar, Typography, Button } from "@material-ui/core";
import { SessionContext } from "../contexts/SessionContext/context";
import { Link } from "react-router-dom";

export default class AppBar extends Component {
  render() {
    return (
      <div className="fg-1">
        <Bar
          position="static"
          elevation={0}
          style={{ backgroundColor: "#131a21" }}
        >
          <Toolbar>
            <Typography variant="h6" className="fg-1">
              <Link to="/" className="link-inherit">
                E-Shop
              </Link>
            </Typography>
            <SessionContext.Consumer>
              {({ user }) => {
                return (
                  <>
                    {!!user ? (
                      <Button color="inherit">{user.displayName}</Button>
                    ) : (
                      <Button color="inherit">Login</Button>
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
