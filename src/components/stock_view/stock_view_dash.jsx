import React, { Component } from 'react';

// import { Line } from 'react-chartjs-2';

// import axios from 'axios';
// import _ from 'lodash';

import StockChart from './stock_chart';
// import * as Mock from '../mock_values/mock_user_values';
// import * as SVG from '../../svg_util';

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
      }
    })
  }

  render() {
    const { stock, onView } = this.state;
    if (onView) {
      return (
        <div className="stock-view">
          <div className="stock-view__title">{stock.quote.companyName}</div>
          <div className="mock__chart">
            <div className="mock__chart-view">
              <StockChart stock={stock} />
            </div>
            <div className="mock__chart-controls">CONTROL</div>
          </div>
          <div className="mock__feed">FEED</div>
        </div>
      )
    } else {
      return (
        <div className="stock-view">
          <div className=""><h1>Welcome</h1></div>
          <div className="mock__chart"></div>
          <div className="mock__feed"></div>
          <div className="mock__feed"></div>
        </div>
      )
    }
  }
}

export default StockView;
