import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

export const WatchListItem = (props) => {
  const {
    item,
    handleClick,
    viewIndex,
    isLast,
    setSelected
  } = props;
  const { quote } = item[1];
  const detailViews = [
    `${quote.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(quote.changePercent * 100, 2))}%`,
    `${quote.change < 0 ? '-' : '+'} ${Math.abs(_.round(quote.change, 2))}`,
    `${_.ceil((quote.marketCap / 1000000000), 2)}B`,
  ];
  const symbol = quote.symbol;
  let viewColor = 'positive';

  if (viewIndex === 0 && quote.changePercent < 0) {
    viewColor = 'negative';
  }

  if (viewIndex === 1 && quote.change < 0) {
    viewColor = 'negative';
  }

  const handleItemClick = () => setSelected(item);

  return (
    <Link to={`/stocks/${symbol}`} onClick={handleItemClick} className='list-item__link'>
      <div className={isLast ? 'list-item last' : "list-item"} name={symbol}>
        <div className="list-item__title">
          {symbol}
        </div>
        <div className="list-item__price">{`$${quote.latestPrice}`}</div>
        <div className={`list-item__detail ${viewColor}`} onClick={handleClick.bind(this)}>
          {detailViews[viewIndex]}
        </div>
      </div>
    </Link>
  )
}
