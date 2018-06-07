import React from 'react';

import { WatchListItem } from './watch_list_item';

export const WatchListings = (props) => {
  const { items, rotateView, viewIndex, setSelected } = props;

  function handleClick(e) {
    if (e) e.preventDefault()
    rotateView()
  }

  return (
    <div className="list">
      {
        items.map((item, index) => <WatchListItem key={index}
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
