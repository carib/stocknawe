import React from 'react';

import _ from 'lodash';

export const ListItem = (props) => {
  const { item, handleClick, viewIndex, isFirst, isLast } = props;
  const { quote } = item[1];
  const symbol = quote.symbol;
  const detailViews = [
    `${quote.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(quote.changePercent * 100, 2))}%`,
    `${quote.change < 0 ? '-' : '+'} ${Math.abs(_.round(quote.change, 2))}`,
    `${_.ceil((quote.marketCap / 1000000000), 2)}B`,
  ];
  let orderClass = 'list-item first selected';
  let viewColor = 'positive';

  if (isLast) {
    orderClass = 'list-item last'
  }

  if (viewIndex === 0 && quote.changePercent < 0) {
    viewColor = 'negative'
  }

  if (viewIndex === 1 && quote.change < 0) {
    viewColor = 'negative'
  }

  return (
    <div className={isLast || isFirst ? orderClass : "list-item"} onClick={handleItemClick}>
      <div className="list-item__title">{symbol}</div>
      <div className="list-item__price">{`$${quote.latestPrice}`}</div>
      <div className={`list-item__detail-${viewColor}`} onClick={handleClick.bind(this)}>{detailViews[viewIndex]}</div>
    </div>
  )
}

function handleItemClick(e) {
  if (e) {
    e.preventDefault();
  }
  let selected = document.getElementsByClassName('selected')[0];
  let item = e.currentTarget;
  item.classList.add('selected');
  if (selected) {
    selected.classList.remove('selected');
  }
}
