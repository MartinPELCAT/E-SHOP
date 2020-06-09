import React, { Component } from "react";
import { Item } from "../models/Item";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Input,
  Collapse,
} from "@material-ui/core";
import { Close, Add, Remove } from "@material-ui/icons";

interface Props {
  item: Item;
  quantity: number;
  onItemRemoved?(): void;
}

interface State {
  quantity: number;
}

export default class BasketItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
    };
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
    this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleItemCollaped = this.handleItemCollaped.bind(this);
  }

  handleIncreaseQuantity() {
    //TODO: Api call
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleDecreaseQuantity() {
    //TODO: Api call
    this.setState({ quantity: this.state.quantity - 1 });
  }

  handleQuantityInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    //TODO: Api call
    if (!!event.target.value) {
      this.setState({ quantity: parseInt(event.target.value) });
    } else {
      this.setState({ quantity: 1 });
    }
  }

  handleRemoveItem() {
    this.setState({ quantity: 0 });
  }

  handleItemCollaped() {
    this.props.onItemRemoved && this.props.onItemRemoved();
  }

  render() {
    return (
      <Collapse in={this.state.quantity > 0} onExited={this.handleItemCollaped}>
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
                <Typography>{this.props.item.title}</Typography>
              </Grid>
              <Grid
                item
                container
                md={2}
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
              >
                <IconButton size={"small"} onClick={this.handleRemoveItem}>
                  <Close fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={8}>
                <IconButton
                  size={"small"}
                  onClick={this.handleDecreaseQuantity}
                >
                  <Remove />
                </IconButton>
                <Input
                  type="number"
                  style={{ width: 60, textAlign: "center" }}
                  value={this.state.quantity}
                  onChange={this.handleQuantityInputChange}
                />
                <IconButton
                  size={"small"}
                  onClick={this.handleIncreaseQuantity}
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item md={4} container direction="row" justify="flex-end">
                <Typography variant={"subtitle2"} color={"textSecondary"}>
                  {this.props.item.unitPrice}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Collapse>
    );
  }
}
