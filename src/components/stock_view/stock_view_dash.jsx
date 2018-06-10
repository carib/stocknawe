import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// import _ from 'lodash';

import StockChart from './stock_chart';
import NewsFeed from '../news_feed/news_feed_dash';
import { DashWidget, WidgetKeyStats } from '../dash_home/dash_widget';

import './view.css';

class StockView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      onView: false,
      viewOptions: {
        ranges: ["dynamic", "date", "1d", "1m", "3m", "6m", "ytd", "1y", "2y", "5y"],
        rangeIndex: 3,
      }
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      stock: this.props.selectedStock,
      onView: true,
    })
  }

  componentDidMount() {
    const widget = document.getElementsByClassName('dash-widget')[0];
    const stats = document.getElementsByClassName('key-stats')[0];
    if (widget && stats) {
      widget.classList.add('single-stock');
      stats.classList.add('single-stock');
      Array.from(widget.getElementsByTagName('*')).forEach(node => node.classList.add('single-stock'));
      Array.from(stats.getElementsByTagName('*')).forEach(node => node.classList.add('single-stock'));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stock: nextProps.selectedStock,
      onView: true,
    })
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    const { stock, onView } = this.state;
    if (stock && onView) {
      return (
        <div className="stock-view">
          <div className="stock-view__title">
            <DashWidget item={[stock.quote.symbol, stock]}
              fetchStocksData={this.props.fetchStocksData}/>
          </div>
          <div className="stock-view__chart">
            <div className="chart-view">
              <StockChart stock={stock} />
            </div>
            <WidgetKeyStats quote={stock.quote}/>
          </div>
          <div className="stock-view__feed-dash">
            <NewsFeed stock={stock} />
          </div>
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}
// <ChartControl handleClick={this.handleClick} />
// const ChartControl = (props) => {
//   return (
//     <div className="chart-controls">
//       <div className="chart-controls__options">CONTROLS</div>
//       <div className="chart-controls__range-selector"></div>
//     </div>
//   )
// }

export default StockView;
