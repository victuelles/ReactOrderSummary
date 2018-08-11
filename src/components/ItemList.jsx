import React, { Component } from 'react';
import ItemListDetail from './ItemListDetail';
class ItemList extends Component {
  render() {
    const { items } = this.props;
    return (
      <div>
     
        {items.map(item => (
          <ItemListDetail
            key={item.id}
            item={item}
          />
        ))}
      
      </div>
    );
  }
}

export default ItemList;
