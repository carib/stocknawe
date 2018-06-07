import React from 'react';

import { ListItem } from './list_item';

export const List = (props) => {
  const { items, rotateView, viewIndex } = props;

  function handleClick(e) {
    if (e) e.preventDefault()
    rotateView()
  }

  return (
    <div className="list">
      {
        items.map((item, index) => <ListItem key={index}
                                      handleClick={handleClick}
                                      viewIndex={viewIndex}
                                      item={item}
                                    />)
      }
      <div className="list__buffer"></div>
    </div>
  )
}