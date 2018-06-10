import React from 'react';

import _ from 'lodash';

import MiniChart from './mini_chart';

export const DashWidget = ({ item, handleClick, viewIndex, isFirst, isLast, parentComponent }) => {

  if (item) {
    const { quote } = item[1];
    const { companyName } = quote;
    const splitPrice = quote.latestPrice.toString().split('.')
    let clippedName = /^(.*\sInc\.)/.test(companyName) ? companyName.match(/^(.*\sInc\.)/)[0] : companyName;
    let indicatorColor = quote.change >= 0 ? '#00FF7F' : '#F03A3A';

    let dollars = splitPrice[0];
    let cents = '.' + splitPrice[1];
    if (cents.length < 3) {
      cents += '0'
    }

    const indicatorStyle = {
      boxShadow: `0px 0px 0px 1px ${indicatorColor}`
    }

    return (
      <div className='dash-widget'>

        <div className="dash-widget__vitals">
          <div className="dash-widget__title">
            <div className="dash-widget__symbol">{quote.symbol}</div>
            <div className="dash-widget__company-name">{clippedName}</div>
          </div>
          <div className="dash-widget__price">
            <div className="dollar-sign">{'$'}</div>
            <div className="dollars">{dollars}</div>
            <div className="cents">{cents}</div>
          </div>
          <div className="dash-widget__change-wrap">
            <div className="dash-widget__change">{quote.change}</div>
            <div className="dash-widget__change-percent">
              {`${_.round(quote.changePercent * 100, 2)}%`}
            </div>
          </div>
          <div style={indicatorStyle} className={`dash-widget__indicator`}></div>
        </div>

        <div className="dash-widget__mini-chart"><MiniChart stock={item[1]}/></div>
      </div>
    )
  } else {
    return <div className="loading">Loading...</div>
  }
}

export const WidgetKeyStats = ({quote}) => {
  let volume = _.reverse(quote.latestVolume.toString().split(''));
  volume = _.chunk(volume, 3).map(arr => arr.join(''));
  volume = _.reverse(_.flatten(volume)).join();
  return (
    <div className="key-stats">

      <div className="key-stat__open">
        <div className="stat-label">{('Open').toUpperCase()}</div>

        <div className="stat-datum">{`$${quote.open}`}</div>
      </div>
      <div className="key-stat__previous-close">
        <div className="stat-label">{('Previous Close').toUpperCase()}</div>

        <div className="stat-datum">{`$${quote.previousClose}`}</div>
      </div>
      <div className="key-stat__volume">
        <div className="stat-label">{('Latest Volume').toUpperCase()}</div>

        <div className="stat-datum">{volume}</div>
      </div>
      <div className="key-stat__market-cap">
        <div className="stat-label">{('Market Cap').toUpperCase()}</div>

        <div className="stat-datum">{`$${_.round(quote.marketCap / 1000000000)} B`}</div>
      </div>
      <div className="key-stat__day-range">
              <div className="stat-label">{('1-Day Range').toUpperCase()}</div>

        <div className="stat-datum-range">
          <div className="stat-datum-low">{`$${quote.low}`}</div>
          <div className="stat-datum-high">{`$${quote.high}`}</div>
        </div>
      </div>
      <div className="key-stat__year-range">
        <div className="stat-label">{('52-Week Range').toUpperCase()}</div>

        <div className="stat-datum-range">
          <div className="stat-datum-low">{`$${quote.week52Low}`}</div>
          <div className="stat-datum-high">{`$${quote.week52High}`}</div>
        </div>
      </div>
    </div>
  )
}
