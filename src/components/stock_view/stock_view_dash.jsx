import React, { Component } from 'react';

import StockChart from './stock_chart';
import NewsFeed from '../news_feed/news_feed_dash';

import './view.css';

class StockView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      onView: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState((state, nextProps) => {
      return {
        ...state,
        stock: nextProps.selectedStock,
        onView: true,
        viewOptions: {

        }
      }
    })
  }

  render() {
    const { stock, onView } = this.state;
    if (onView) {
      return (
        <div className="content">
          <div className="stock-view__title">
            {`${stock.quote.companyName} (${stock.quote.symbol})`}
          </div>
          <div className="chart">
            <div className="chart-wrap">
              <div className="chart-tab"></div>
              <div className="chart-view">
                <StockChart stock={stock} />
              </div>
              <div className="chart-buffer"></div>
            </div>
            <div className="mock__chart-controls">
              <div className="chart-controls__options">CONTROLS</div>
            </div>
          </div>

          <div className="feed-dash">
            <NewsFeed stock={stock} />
          </div>

        </div>
      )
    } else {
      return (
        <div className="stock-view">
          <div className=""><h1>Welcome</h1></div>
          <div className="mock__chart"></div>
          <div className="mock__feed"></div>
        </div>
      )
    }
  }
}

export default StockView;
