import React from 'react';

import { ListItem } from './list_item';

export const List = (props) => {
  const { items, rotateView, viewIndex, setSelected } = props;

  function handleClick(e) {
    if (e) e.preventDefault()
    rotateView()
  }

  return (
    <div className="list">
      {
        items.map((item, index) => <ListItem key={index}
                                      setSelected={setSelected}
                                      handleClick={handleClick}
                                      viewIndex={viewIndex}
                                      item={item}
                                      isFirst={index === 0 ? true : false}
                                      isLast={index === items.length -1 ? true : false}
                                    />)
      }
    </div>
  )
}
