import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import _ from 'lodash';

import { AppContext } from '../../context_api';
import StockChart from './stock_chart';
import NewsFeed from '../news_feed/news_feed_dash';
import { DashWidget } from '../dash_home/dash';

import './view.css';

const StockView = () => (
  <AppContext.Consumer>
    {({ state }) => {
      let { selectedStock } = state
      if (_.size(selectedStock)) {
        return (
          <div className="stock-view">
            <div className="stock-view__title">
              <DashWidget item={selectedStock} view={'stock-view'} />
            </div>
            <div className="stock-view__chart">
              <div className="chart-view">
                <StockChart stock={selectedStock} />
              </div>
              <KeyStats quote={selectedStock.quote}/>
            </div>
            <div className="stock-view__feed-dash">
              <NewsFeed stock={selectedStock} />
            </div>
          </div>
        )
      } else {
        return <Redirect to='/' />
      }
    }}
  </AppContext.Consumer>
)

const KeyStats = ({ quote }) => {
  let volume = _.reverse(quote.latestVolume.toString().split(''));
  volume = _.chunk(volume, 3).map(arr => arr.join(''));
  volume = _.reverse(_.flatten(volume)).join();
  const stats = [
    {
     className: 'open',
     label: ('Open').toUpperCase(), datum: `$${quote.open}`
    },
    {
     className: 'previous-close',
     label: ('Previous Close').toUpperCase(), datum: `$${quote.previousClose}`
    },
    {
     className: 'volume',
     label: ('Latest Volume').toUpperCase(), datum: volume
    },
    {
     className: 'market-cap',
     label: ('Market Cap').toUpperCase(), datum: `$${_.round(quote.marketCap / 1000000000)} B`
    },
    {
     className: 'day-range',
     label: ('1-Day Range').toUpperCase(), low: `$${quote.low}`, high: `$${_.round(quote.high, 2)}`
    },
    {
     className: 'year-range',
     label: ('52-Week Range').toUpperCase(), low: `$${quote.week52Low}`, high: `$${_.round(quote.week52High, 2)}`
    }
  ];

  return (
    <div className="key-stats">
      {
        stats.map((stat, index) => <KeyStat key={index} stat={stat} />)
      }
    </div>
  )
}

const KeyStat = ({ stat }) => {
  if (/range/.test(stat.className)) {
    return (
      <div className={`key-stat__${stat.className}`}>
        <div className="stat-label">{(stat.label).toUpperCase()}</div>
        <div className="stat-datum-range">
          <div className="stat-datum-low">{`${stat.low}`}</div>
          <div className="stat-datum-high">{`${stat.high}`}</div>
        </div>
      </div>
    )
  }
  return (
    <div className={`key-stat__${stat.className}`}>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-datum">
        {stat.datum}
      </div>
    </div>
  )
}

export default withRouter(StockView);
