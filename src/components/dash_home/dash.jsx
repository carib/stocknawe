import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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
    <div className="dash__greeting">{getGreeting()}</div>
    <DashCarousel />
  </div>
)


const DashCarousel = () => {
  return (
    <AppContext.Consumer>
      {({ state, actions }) => {
        let items = _.values(state.watchList);
        return (
          <div className="dash__carousel">
            {
              items.map((item, index) => {
                const handleClick = (e) => actions.setSelected(e.currentTarget.name);
                return (
                  <Link key={index} to={`/stocks/${item.quote.symbol}`} name={item.quote.symbol} className={`dash-widget__link`} >
                    <DashWidget
                      item={item}
                      setSelected={actions.setSelected}
                      onView={state.onView}
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
}

export const DashWidget = ({ item, setSelected, onView }) => {
  const { quote } = item;
  const { companyName } = quote;
  const splitPrice = quote.latestPrice.toString().split('.')
  let clippedName = /^(.*\sInc\.)/.test(companyName) ? companyName.match(/^(.*\sInc\.)/)[0] : companyName;
  let indicatorColor = quote.change >= 0 ? '#00FF7F' : '#F03A3A';
  let parent = onView ? 'stock-view' : 'dash';
  let dollars = splitPrice[0];
  let cents = '.' + splitPrice[1];
  if (cents.length < 3) {
    cents += '0'
  }

  const indicatorStyle = {
    boxShadow: `0px 0px 0px 1px ${indicatorColor}`
  }

  return (
    <div className={`${parent}-widget`} data-stock={quote.symbol} onClick={setSelected}>
      <div className={`${parent}-widget__vitals`}>
        <div className={`${parent}-widget__title`}>
          <div className={`${parent}-widget__symbol`}>{quote.symbol}</div>
          <div className={`${parent}-widget__company-name`}>{clippedName}</div>
        </div>
        <div className={`${parent}-widget__price`}>
          <div className={`${parent}-widget__dollar-sign`}>{'$'}</div>
          <div className={`${parent}-widget__dollars`}>{dollars}</div>
          <div className={`${parent}-widget__cents`}>{cents}</div>
        </div>
        <div className={`${parent}-widget__change-wrap`}>
          <div className={`${parent}-widget__change`}>{quote.change}</div>
          <div className={`${parent}-widget__change-percent`}>
            {`${_.round(quote.changePercent * 100, 2)}%`}
          </div>
        </div>
        <div style={indicatorStyle} className={`${parent}-widget__indicator`}></div>
      </div>
      <div className={`${parent}-widget__mini-chart`}><MiniChart stock={item}/></div>
    </div>
  )
}

export const KeyStats = ({ quote }) => {
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
     label: ('1-Day Range').toUpperCase(), low: `$${quote.low}`, high: `$${quote.high}`
   },
   {
     className: 'year-range',
     label: ('52-Week Range').toUpperCase(), low: `$${quote.week52Low}`, high: `$${quote.week52High}`
   },
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
