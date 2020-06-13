import React, { Component } from "react";
import { Item } from "../models/Item";
import DefaultItem from "./DefaultItem";
import { Grid } from "@material-ui/core";

interface Props {
  items: Array<Item>;
}

export default class ListItems extends Component<Props> {
  render() {
    return (
      <Grid container spacing={2}>
        {this.props.items.map((item) => {
          return <DefaultItem key={item.id} item={item} />;
        })}
      </Grid>
    );
  }
}
