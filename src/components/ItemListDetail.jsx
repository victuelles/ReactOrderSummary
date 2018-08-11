import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';

class ItemListDetail extends Component {
  render() {
    const {item} = this.props
    return (
        <Grid columns={2} divided  >
        <Grid.Row>
        <Grid.Column width={4}>
           <Item>
                <Item.Image size="tiny"  src={item.photoURL} />
            </Item>
        </Grid.Column>
        <Grid.Column width={12}>
            <Item>
                <Item.Content>
                  <Item.Header >{item.title}</Item.Header>
              <Item.Description>
              {item.description}
              </Item.Description>
              {item.selling_price} Qty: {item.quantity}
              </Item.Content>
            </Item>
        </Grid.Column>
        </Grid.Row  >
       
  </Grid>
    );
  }
}

export default ItemListDetail;
