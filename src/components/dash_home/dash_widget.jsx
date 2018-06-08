import React from 'react';

import _ from 'lodash';

import MiniChart from './mini_chart';

export const DashWidget = (props) => {
  if (props.watchList['NKE']) {
    let { quote } = props.watchList['NKE']
    return (
      <div className="mock__widget">
        <div className="mock__vitals">
          <div className="mock__widget-title">
            <div className="mock__symbol">{quote.symbol}</div>
            <div className="mock__companyName">{quote.companyName}</div>
          </div>
          <div className="mock__primary-exchange">{quote.primaryExchange}</div>
          <div className="mock__widget-price">{`$${quote.latestPrice}`}</div>
          <div className="mock__widget-change">
            <div className="mock__change">{quote.change}</div>
            <div className="mock__changePercent">{`${_.round(quote.changePercent * 100, 2)}%`}</div>
            <div className="mock__indicator">^</div>
          </div>
        </div>
        <div className="mock__mini-chart"><MiniChart stock={props.watchList['NKE']}/></div>
        <div className="mock__key-stats">
          <div className="mock__peRatio">
                  peRatio
                  <br/>
            {quote.peRatio}
          </div>
          <div className="mock__open">
                  open
                  <br/>
            {quote.open}
          </div>
          <div className="mock__previous-close">
                  previousClose
                  <br/>
            {quote.previousClose}
          </div>
          <div className="mock__volume">
                  latestVolume
                  <br/>
            {quote.latestVolume}
          </div>
          <div className="mock__market-cap">
                  marketCap
                  <br/>
            {`${_.round(quote.marketCap / 1000000000)}B`}
          </div>
          <div className="mock__day-range">
                  day range
                  <br/>
            {`${quote.low}->${quote.high}`}
          </div>
          <div className="mock__year-range">
                  52-week range
                  <br/>
            {`${quote.week52Low}->${quote.week52High}`}
          </div>
        </div>
        <div className="mock__headlines">
          <div className="mock__mini-feed-item">
            <div className="mock__headline">{props.watchList['NKE'].news[0].headline}</div>
            <div className="mock__source">{props.watchList['NKE'].news[0].source}</div>
            <div className="mock__summary">{`${props.watchList['NKE'].news[0].summary.slice(0, 140)}...`}</div>
          </div>
          <div className="mock__mini-feed-item">
            <div className="mock__headline">{props.watchList['NKE'].news[1].headline}</div>
            <div className="mock__source">{props.watchList['NKE'].news[1].source}</div>
            <div className="mock__summary">{`${props.watchList['NKE'].news[1].summary.slice(0, 140)}...`}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div className="loading">Loading...</div>
  }
}
