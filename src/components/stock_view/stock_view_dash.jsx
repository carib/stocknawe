import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

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

  componentWillMount() {
    this.setState({
      stock: this.props.selectedStock,
      onView: true,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stock: nextProps.selectedStock,
      onView: true,
      viewOptions: {}
    })
  }

  render() {
    const { stock, onView } = this.state;
    if (stock && onView) {
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
      return <Redirect to='/' />
    }
  }
}

export default StockView;
