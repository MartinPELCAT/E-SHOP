import React, { Component, Fragment } from "react";
import {
  IconButton,
  Badge,
  Card,
  CardContent,
  Popover,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { ShoppingCart, Close } from "@material-ui/icons";
import { BasketContext } from "../contexts/BasketContext/BasketContext";

interface State {
  anchorEl: null | Element;
}

export default class Basket extends Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    return (
      <BasketContext.Consumer>
        {({ items }) => (
          <>
            <IconButton
              aria-label="cart"
              onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
            >
              <Badge badgeContent={items?.length} max={10} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {!!items?.length && (
              <Popover
                id="basket-menu"
                open={!!this.state.anchorEl}
                keepMounted
                style={{ maxHeight: 350 }}
                anchorEl={this.state.anchorEl}
                onClose={this.handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {items.map(({ item, quantity }, index) => (
                  <Fragment key={item.id}>
                    <Card
                      style={{
                        width: 400,
                        borderRadius: 0,
                        border: "none",
                      }}
                      elevation={0}
                    >
                      <CardContent style={{ paddingBottom: 16 }}>
                        <Grid container>
                          <Grid item md={10}>
                            <Typography>{item.title}</Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            md={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                          >
                            <Close
                              fontSize="small"
                              style={{
                                position: "relative",
                                top: -10,
                                right: -10,
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item md={8}>
                            something there
                          </Grid>
                          <Grid
                            item
                            md={4}
                            container
                            direction="row"
                            justify="flex-end"
                          >
                            <Typography
                              variant={"subtitle2"}
                              color={"textSecondary"}
                            >
                              {item.unitPrice}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    {index !== items.length - 1 && <Divider />}
                  </Fragment>
                ))}
              </Popover>
            )}
          </>
        )}
      </BasketContext.Consumer>
    );
  }
}
