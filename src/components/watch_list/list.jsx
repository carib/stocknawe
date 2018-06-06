import React from 'react';

import { ListItem } from './list_item';

export const List = ({ items }) => {
  return (
    <div className="list">
      {
        items.map((item, index) => <ListItem key={index} item={item} />)
      }
      <div className="list__buffer"></div>
    </div>
  )
}
