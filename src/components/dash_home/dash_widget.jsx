import React from 'react';

import _ from 'lodash';

import MiniChart from './mini_chart';

export const DashWidget = ({ item, handleClick, viewIndex, isFirst, isLast }) => {
  // debugger
  if (item) {
    let news = item[1].news.slice(0, 2);
    let { symbol, companyName, low, high,
          change, changePercent, latestVolume, peRatio,
          open, previousClose, primaryExchange, marketCap,
          latestPrice, week52Low, week52High } = item[1].quote;
    let clippedName = /^(.*\sInc\.)/.test(companyName) ? companyName.match(/^(.*\sInc\.)/)[0] : companyName;
    return (
      <div className="dash-widget">
        <div className="dash-widget__vitals">
          <div className="dash-widget__title">
            <div className="dash-widget__symbol">{symbol}</div>
            <div className="dash-widget__companyName">
              {clippedName}
            </div>
          </div>
          <div className="dash-widget__primary-exchange">{primaryExchange}</div>
          <div className="dash-widget__price">{`$${latestPrice}`}</div>
          <div className="dash-widget__change">
            <div className="dash-widget__change">{change}</div>
            <div className="dash-widget__changePercent">
              {`${_.round(changePercent * 100, 2)}%`}
            </div>
            <div className="dash-widget__indicator">^</div>
          </div>
        </div>
        <div className="dash-widget__mini-chart"><MiniChart stock={item[1]}/></div>
        <div className="dash-widget__key-stats">
          <div className="dash-widget__peRatio">
                  peRatio
                  <br/>
            {peRatio}
          </div>
          <div className="dash-widget__open">
                  open
                  <br/>
            {open}
          </div>
          <div className="dash-widget__previous-close">
                  previousClose
                  <br/>
            {previousClose}
          </div>
          <div className="dash-widget__volume">
                  latestVolume
                  <br/>
            {latestVolume}
          </div>
          <div className="dash-widget__market-cap">
                  marketCap
                  <br/>
            {`${_.round(marketCap / 1000000000)}B`}
          </div>
          <div className="dash-widget__day-range">
                  day range
                  <br/>
            {`${low}->${high}`}
          </div>
          <div className="dash-widget__year-range">
                  52-week range
                  <br/>
            {`${week52Low}->${week52High}`}
          </div>
        </div>
        <div className="dash-widget__feed">
          {
            news.map((story, index)=> <MiniFeed story={story} key={index} />)
          }
        </div>

      </div>
    )
  } else {
    return <div className="loading">Loading...</div>
  }
}

const MiniFeed = ({ story }) => {
  return (
    <div className="mini-feed-item">
      <div className="mini-feed-item__headline">{`${story.headline.slice(0, 40)}...`}</div>
      <div className="mini-feed-item__source">{`- ${story.source}`}</div>
    </div>
  )
}
