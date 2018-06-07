import React from 'react';

import _ from 'lodash';

export const ListItem = (props) => {
  const { item, handleClick, viewIndex } = props;
  const { quote } = item[1];
  const symbol = quote.symbol;
  const detailViews = [
    `${quote.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(quote.changePercent * 100, 2))}%`,
    `${quote.change < 0 ? '-' : '+'} ${Math.abs(_.round(quote.change, 2))}`,
    `${_.ceil((quote.marketCap / 1000000000), 2)}B`,
  ];
  let viewColor = 'positive'

  if (viewIndex === 0 && quote.changePercent < 0) {
    viewColor = 'negative'
  }

  if (viewIndex === 1 && quote.change < 0) {
    viewColor = 'negative'
  }

  return (
    <div className="list-item">
      <div className="list-item__title">{symbol}</div>
      <div className="list-item__price">{`$${quote.latestPrice}`}</div>
      <div className={`list-item__detail-${viewColor}`} onClick={handleClick.bind(this)}>{detailViews[viewIndex]}</div>
    </div>
  )
}
