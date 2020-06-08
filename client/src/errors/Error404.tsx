import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

export default class Error404 extends Component {
  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item style={{ textAlign: "center" }}>
          <Typography variant={"h1"} color={"initial"}>
            404
          </Typography>
          <Typography variant={"h6"} color={"textSecondary"}>
            This ressource does not exist
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
