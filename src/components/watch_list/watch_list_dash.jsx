import React, { Component } from 'react';

import { List } from './list';
import './watch_list.css';

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedItems: {
        'NKE': { price: '$55'},
        'ETSY': { price: '$13'},
        'INTU': { price: '$94'},
        'SHAK': { price: '$36'},
      }
    }
  }

  render() {
    return (
      <div className="watch-list">
        <div className="mock__search">SEARCH BAR</div>
        <List items={Object.entries(this.state.watchedItems)} />
        <div className="watch-list__controls">
          <button className="button">Add</button>
          <button className="button">Nix</button>
        </div>
      </div>
    )
  }
}

export default WatchList;
