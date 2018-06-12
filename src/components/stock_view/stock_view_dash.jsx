import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import _ from 'lodash';

import {AppContext} from '../../context_api';
import StockChart from './stock_chart';
import NewsFeed from '../news_feed/news_feed_dash';
import { DashWidget, KeyStats } from '../dash_home/dash';

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
export default withRouter(StockView);
