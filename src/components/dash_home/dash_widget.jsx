import React from 'react';

import _ from 'lodash';

import MiniChart from './mini_chart';

export const DashWidget = ({ item, handleClick, viewIndex, isFirst, isLast, parentComponent }) => {

  if (item) {
    const { quote } = item[1];
    const { companyName } = quote;
    let clippedName = /^(.*\sInc\.)/.test(companyName) ? companyName.match(/^(.*\sInc\.)/)[0] : companyName;
    let indicatorColor = quote.change < 0 ? 'negative' : 'positive';

    if (parentComponent) {

    }
    return (
      <div className='dash-widget'>

        <div className="dash-widget__vitals">
          <div className="dash-widget__title">
            <div className="dash-widget__symbol">{quote.symbol}</div>
            <div className="dash-widget__company-name">{clippedName}</div>
          </div>
          <div className="dash-widget__price">{`$${quote.latestPrice}`}</div>
          <div className="dash-widget__change-wrap">
            <div className="dash-widget__change">{quote.change}</div>
            <div className="dash-widget__change-percent">
              {`${_.round(quote.changePercent * 100, 2)}%`}
            </div>
          </div>
          <div className={`dash-widget__indicator ${indicatorColor}`}></div>
        </div>

        <div className="dash-widget__key-stats">

          <div className="key-stat__open">
            <div className="key-stat__label">open</div>
                  <br/>
            <div className="key-stat__datum">{quote.open}</div>
          </div>
          <div className="key-stat__previous-close">
            <div className="key-stat__label">previousClose</div>
                  <br/>
            <div className="key-stat__datum">{quote.previousClose}</div>
          </div>
          <div className="key-stat__volume">
            <div className="key-stat__label">latestVolume</div>
                  <br/>
            <div className="key-stat__datum">{quote.latestVolume}</div>
          </div>
          <div className="key-stat__market-cap">
            <div className="key-stat__label">marketCap</div>
                  <br/>
            <div className="key-stat__datum">{`${_.round(quote.marketCap / 1000000000)}B`}</div>
          </div>
          <div className="key-stat__day-range">
                  <div className="key-stat__label">day range</div>
                  <br/>
            <div className="key-stat__datum">{`${quote.low}->${quote.high}`}</div>
          </div>
          <div className="key-stat__year-range">
            <div className="key-stat__label">52-week range</div>
                  <br/>
            <div className="key-stat__datum">{`${quote.week52Low}->${quote.week52High}`}</div>
          </div>
        </div>

        <div className="dash-widget__mini-chart"><MiniChart stock={item[1]}/></div>
      </div>
    )
  } else {
    return <div className="loading">Loading...</div>
  }
}
