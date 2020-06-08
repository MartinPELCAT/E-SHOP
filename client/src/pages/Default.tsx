import React, { Component } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Grid } from "@material-ui/core";
import Test from "../components/Test";

export default class Default extends Component {
  render() {
    return (
      <DefaultLayout>
        <Grid container>
          <Grid item md={2}>
            <Test />
          </Grid>
          <Grid item md={10}>
            right
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}
