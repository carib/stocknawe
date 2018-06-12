import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

export const SearchListItem = (props) => {
  const {
    item,
    handleClick
  } = props;
  console.log(item);
  const { quote } = item[1];
  const detailViews = [
    `${quote.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(quote.changePercent * 100, 2))}%`,
    `${quote.change < 0 ? '-' : '+'} ${Math.abs(_.round(quote.change, 2))}`,
    `${_.ceil((quote.marketCap / 1000000000), 2)}B`,
  ];
  const symbol = quote.symbol;
  let viewColor = 'positive';

  return (
    <div className="search-list-item" name={symbol}>
      <div className="search-list-item__title">
        {symbol}
      </div>
      <div className="search-list-item__price">{`$${quote.latestPrice}`}</div>
      <div className={`search-list-item__detail ${viewColor}`}>
      </div>
    </div>
  )
}
