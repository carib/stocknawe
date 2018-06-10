import React from 'react';

import { SearchListItem } from './search_list_item';

export const SearchListings = (props) => {
  const { items, rotateView, viewIndex, setSelected, style } = props;
  function handleClick(e) {
    if (e) e.preventDefault()
    rotateView()
  }

  return (
    <div className="search-list" style={style}>
      {
        items.map((item, index) => <SearchListItem key={index}
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
