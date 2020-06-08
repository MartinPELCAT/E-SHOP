import React, { Component } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { User } from "../models/User";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext/context";

interface Props {
  user: User;
}

interface States {
  anchorMenu: null | Element;
}

export default class LoggedAppBarItem extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorMenu: null,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ anchorMenu: null });
  }

  render() {
    return (
      <>
        <Button
          color="inherit"
          onClick={(e) => this.setState({ anchorMenu: e.currentTarget })}
        >
          {this.props.user.displayName}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorMenu}
          keepMounted
          open={!!this.state.anchorMenu}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} component={Link} to={"/sell"}>
            Seller
          </MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to={"/profile"}>
            Profile
          </MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <SessionContext.Consumer>
            {({ logout }) => (
              <>
                <MenuItem
                  onClick={() => {
                    logout();
                    return this.handleClose;
                  }}
                >
                  Log out
                </MenuItem>
              </>
            )}
          </SessionContext.Consumer>
        </Menu>
      </>
    );
  }
}
