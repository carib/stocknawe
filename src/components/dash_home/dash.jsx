import React from 'react';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import MiniChart from './mini_chart';
import { AppContext } from '../../context_api';

import './dash.css'

const getGreeting = () => {
  let hour = new Date().getHours();
  let period;
  if (hour < 12) {
    period = 'morning'
  } else if (_.inRange(hour, 12, 17)) {
    period = 'afternoon'
  } else if (_.inRange(hour, 17, 22)) {
    period = 'evening'
  } else {
    period = 'night'
  }
  let greeting = `Good ${period}! :)`
  return <div className="greeting-text">{greeting}</div>
}

export const Dashboard = () => (
  <div className="dash">
    <div className="dash__greeting"></div>
    <DashCarousel />
  </div>
)

const DashCarousel = () => (
  <AppContext.Consumer>
    {({ state, actions }) => {
      let items = _.values(state.watchList);
      return (
        <div className="dash__carousel">
          {
            items.map((item, index) => {
              return (
                <Link key={index} to={`/stocks/${item.quote.symbol}`} name={item.quote.symbol} className={`dash-widget__link`} >
                  <DashWidget
                    item={item}
                    setSelected={actions.setSelected}
                    view={'dash'}
                  />
                </Link>
              )
            })
          }
        </div>
      )
    }}
  </AppContext.Consumer>
)

export const DashWidget = ({ item, setSelected, view }) => {
  const { quote } = item;
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
    boxShadow: `inset 0px 0px 0px 1px ${indicatorColor}`
  }

  return (
    <div className={`${view}-widget`} data-stock={quote.symbol} onClick={setSelected} name={quote.symbol}>
      <div className={`${view}-widget__vitals`}>
        <div className={`${view}-widget__title`}>
          <div className={`${view}-widget__symbol`}>{quote.symbol}</div>
          <div className={`${view}-widget__company-name`}>{clippedName}</div>
        </div>
        <div className={`${view}-widget__price`}>
          <div className={`${view}-widget__dollar-sign`}>{'$'}</div>
          <div className={`${view}-widget__dollars`}>{dollars}</div>
          <div className={`${view}-widget__cents`}>{cents}</div>
        </div>
        <div className={`${view}-widget__change-wrap`}>
          <div className={`${view}-widget__change`}>{quote.change}</div>
          <div className={`${view}-widget__change-percent`}>
            {`${_.round(quote.changePercent * 100, 2)}%`}
          </div>
        </div>
        <div style={indicatorStyle} className={`${view}-widget__indicator`}></div>
      </div>
      <div className={`${view}-widget__mini-chart`}><MiniChart stock={item}/></div>
    </div>
  )
}
