import React, { Component } from 'react';

// import axios from 'axios';
// import _ from 'lodash';

import * as Mock from '../mock_values/mock_user_values';
import * as SVG from '../../svg_util';

import './view.css';

class StockView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      onView: false,
    }
  }

  componentDidMount() {
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
          <div className="">{stock.quote.companyName}</div>
          <div className="display-selected">
          </div>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

// const StockView = (props) => {
//   // debugger
//   const stockDetails = () =>
//   console.log();
//   if (props.selectedStock) {
//     return (
//       <div className="mock__chart">
//         <div className="">{props.match.params.symbol}</div>
//         <div className="display-selected">
//         </div>
//       </div>
//     )
//   } else {
//     return <h1>Loading...</h1>
//   }
// }

export default StockView;
