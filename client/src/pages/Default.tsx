import React, { Component } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Grid } from "@material-ui/core";

export default class Default extends Component {
  render() {
    return (
      <DefaultLayout>
        <Grid container>
          <Grid item md={2}>
            left
          </Grid>
          <Grid item md={10}>
            right
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}
