import React from 'react';

import _ from 'lodash';

import MiniChart from './mini_chart';

export const DashWidget = ({ item, handleClick, viewIndex, isFirst, isLast }) => {
  // debugger
  if (item) {
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
            <div className="dash-widget__company-name">{clippedName}</div>
          </div>
          <div className="dash-widget__price">{`$${latestPrice}`}</div>
          <div className="dash-widget__change-wrap">
            <div className="dash-widget__change">{change}</div>
            <div className="dash-widget__change-percent">
              {`${_.round(changePercent * 100, 2)}%`}
            </div>
          </div>
          <div className="dash-widget__indicator"></div>
        </div>
        <div className="dash-widget__mini-chart"><MiniChart stock={item[1]}/></div>
        <div className="dash-widget__key-stats">

          <div className="key-stat__open">
            <div className="key-stat__label">open</div>
                  <br/>
            <div className="key-stat__datum">{open}</div>
          </div>
          <div className="key-stat__previous-close">
            <div className="key-stat__label">previousClose</div>
                  <br/>
            <div className="key-stat__datum">{previousClose}</div>
          </div>
          <div className="key-stat__volume">
            <div className="key-stat__label">latestVolume</div>
                  <br/>
            <div className="key-stat__datum">{latestVolume}</div>
          </div>
          <div className="key-stat__market-cap">
            <div className="key-stat__label">marketCap</div>
                  <br/>
            <div className="key-stat__datum">{`${_.round(marketCap / 1000000000)}B`}</div>
          </div>
          <div className="key-stat__day-range">
                  <div className="key-stat__label">day range</div>
                  <br/>
            <div className="key-stat__datum">{`${low}->${high}`}</div>
          </div>
          <div className="key-stat__year-range">
            <div className="key-stat__label">52-week range</div>
                  <br/>
            <div className="key-stat__datum">{`${week52Low}->${week52High}`}</div>
          </div>
        </div>

      </div>
    )
  } else {
    return <div className="loading">Loading...</div>
  }
}
// let news = item[1].news.slice(0, 2);
// const MiniFeed = ({ story }) => {
//   return (
//     <div className="mini-feed-item">
//       <div className="mini-feed-item__headline">{`${story.headline.slice(0, 40)}...`}</div>
//       <div className="mini-feed-item__source">{`- ${story.source}`}</div>
//     </div>
//   )
// }
// <div className="dash-widget__pe-ratio">
//   <div className="key-stats__label">peRatio</div>
//         <br/>
//   <div className="key-stats__datum">{peRatio}</div>
// </div>
// <div className="dash-widget__feed">
//   {
//     news.map((story, index)=> <MiniFeed story={story} key={index} />)
//   }
// </div>
