import React from 'react';

import _ from 'lodash';

import { SearchContext } from '../../../context_api';

export const SearchResults = () => {
  return (
    <SearchContext.Consumer>
      {({ state, actions }) => {
        let items = _.entries(state.searchResults);
        return (
          <div className="search-list">
            {
              items.map((item, index) => <SearchResult
                                          key={index}
                                          item={item[1]}
                                          viewIndex={state.viewIndex}
                                          rotateView={actions.rotateView}
                                          addToWatchList={actions.addToWatchList}
              />)
            }
          </div>
        )
      }}
    </SearchContext.Consumer>
  )
}

const SearchResult = (props) => {
  const {
    item,
    viewIndex,
    rotateView,
    addToWatchList,
  } = props;
  const { quote } = item;
  const detailViews = [
    `${quote.changePercent < 0 ? '-' : '+'} ${Math.abs(_.round(quote.changePercent * 100, 2))}%`,
    `${quote.change < 0 ? '-' : '+'} ${Math.abs(_.round(quote.change, 2))}`,
    `${_.ceil((quote.marketCap / 1000000000), 2)}B`,
  ];
  const { symbol, companyName } = quote;
  let viewColor = 'positive';

  if (viewIndex === 0 && quote.changePercent < 0) {
    viewColor = 'negative';
  }

  if (viewIndex === 1 && quote.change < 0) {
    viewColor = 'negative';
  }
  console.log(item);
  return (
    <div className="search-result" data-symbol={symbol} onClick={addToWatchList}>
      <div className="search-result__title">
        <div className="search-result__symbol">{symbol}</div>
        <div className="search-result__name">{companyName}</div>
      </div>
      <div className="search-result__price">{`$${quote.latestPrice}`}</div>
      <div className={`search-result__detail ${viewColor}`} onClick={rotateView}>
        {detailViews[viewIndex]}
      </div>
    </div>
  )
}
