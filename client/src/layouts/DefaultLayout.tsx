import React, { Component } from "react";
import AppBar from "../components/AppBar";
import { Box } from "@material-ui/core";
export default class DefaultLayout extends Component {
  render() {
    return (
      <>
        <AppBar />
        <Box padding={2}>{this.props.children}</Box>
      </>
    );
  }
}
