import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import { AppContext } from '../../../context_api';

const WatchList = () => (
  <AppContext.Consumer>
    {({state, actions}) => {
      let items = _.entries(state.watchList);
      let listGridRow = _.size(state.watchList) + 10;
      const listStyle = {
        gridRow: `1 / span ${listGridRow}`
      }
      return (
        <div className="list" style={listStyle}>
          {
            items.map((item, index) => <WatchListItem
                                        key={index}
                                        item={item[1].quote}
                                        isLast={index === items.length -1 ? true : false}
                                        viewIndex={state.viewIndex}
                                        rotateView={actions.rotateView}
                                        setSelected={actions.setSelected}
            />)
          }
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default WatchList;

const WatchListItem = (props) => {
  const {
    item,
    isLast,
    viewIndex,
    rotateView,
    setSelected,
  } = props;
  const detailViews = [
    `${item.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(item.changePercent * 100, 2))}%`,
    `${item.change < 0 ? '-' : '+'} ${Math.abs(_.round(item.change, 2))}`,
    `${_.ceil((item.marketCap / 1000000000), 2)}B`,
  ];
  const symbol = item.symbol;
  let viewColor = 'positive';

  if (viewIndex === 0 && item.changePercent < 0) {
    viewColor = 'negative';
  }

  if (viewIndex === 1 && item.change < 0) {
    viewColor = 'negative';
  }
  return (
    <Link to={`/stocks/${symbol}`} className='list-item__link'>
      <div className={isLast ? 'list-item last' : "list-item"} data-stock={symbol} onClick={setSelected} name={symbol}>
        <div className="list-item__title">
          {symbol}
        </div>
        <div className="list-item__price">{`$${item.latestPrice}`}</div>
        <div className={`list-item__detail ${viewColor}`} onClick={rotateView}>
          {detailViews[viewIndex]}
        </div>
      </div>
    </Link>
  )
}
