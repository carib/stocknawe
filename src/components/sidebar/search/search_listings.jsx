import React from 'react';

import { SearchListItem } from './search_list_item';

export const SearchListings = (props) => {
  const { items } = props;

  return (
    <div className="search-list">
      {
        items.map((item, index) => <SearchListItem key={index}
                                      item={item}
                                    />)
      }
    </div>
  )
}
