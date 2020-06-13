import React, { Component } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Grid, Paper } from "@material-ui/core";
import Test from "../components/Test";
import Categorie from "../models/Categorie";
import ListItems from "../components/ListItems";
import { BasketContext } from "../contexts/BasketContext/BasketContext";

export default class Default extends Component {
  componentDidMount() {
    let cat = new Categorie({ id: "tre", name: "pff" });
    console.log(cat);
    console.log(cat.name);
  }
  render() {
    return (
      <DefaultLayout>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Paper>
              <Test />
            </Paper>
          </Grid>
          <Grid item md={10}>
            <BasketContext.Consumer>
              {({ items }) => (
                <ListItems
                  items={items!.map(({ item }) => {
                    return item;
                  })}
                />
              )}
            </BasketContext.Consumer>
          </Grid>
        </Grid>
      </DefaultLayout>
    );
  }
}
