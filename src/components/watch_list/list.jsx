import React from 'react';

import { ListItem } from './list_item';

export const List = (items) => (
  <div className="list">
    {
      Object.entries(items).map((item, index) => <ListItem key={index} item={item} />)
    }
  </div>
)
