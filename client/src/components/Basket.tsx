import React, { Component, Fragment } from "react";
import { IconButton, Badge, Popover, Divider } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { BasketContext } from "../contexts/BasketContext/BasketContext";
import BasketItem from "./BasketItem";

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
        {({ items, removeItem }) => (
          <>
            <IconButton
              aria-label="cart"
              onClick={(e) =>
                this.setState({ anchorEl: Object.seal(e.currentTarget) })
              }
            >
              <Badge badgeContent={items?.length} max={10} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {!!items?.length && (
              <Popover
                open={!!this.state.anchorEl}
                keepMounted
                style={{
                  maxHeight: "75vh",
                }}
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
                    <BasketItem
                      item={item}
                      onItemRemoved={() => removeItem && removeItem(item)}
                      quantity={quantity}
                    />
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
