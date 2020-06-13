import React, { Component } from "react";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { Item } from "../models/Item";

interface Props {
  item: Item;
}

export default class DefaultItem extends Component<Props> {
  render() {
    return (
      <Grid item md={3} lg={2} sm={4} xs={12}>
        <Paper>
          <Typography variant="body2">Insert photo</Typography>
          <Divider />
          <Typography variant="body2"> {this.props.item.title}</Typography>
        </Paper>
      </Grid>
    );
  }
}
